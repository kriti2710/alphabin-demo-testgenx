
const { chromium, firefox, webkit } = require('@playwright/test');
const config = require('./playwright.config.js');
const path = require('path');
const fs = require('fs');
// const { setupBrowser } = require('./setupHelpers.js');

class BrowserFactory {
    static async createBrowserWithContext(browserName, contextOptions = {}) {
        let browser;
        let context;
        const isHeadless = config.use.headless !== false;

        const launchOptions = {
            ...config.use.launchOptions,
            args: [
                ...(config.use.launchOptions?.args || []),
                '--window-size=1920,1080'  // works in both headless and headed mode
            ]
        };

        switch (browserName.toLowerCase()) {
            case 'chromium':
                browser = await chromium.launch(launchOptions);
                break;
            case 'firefox':
                browser = await firefox.launch(launchOptions);
                break;
            case 'webkit':
                browser = await webkit.launch(launchOptions);
                break;
            default:
                throw new Error(`Unsupported browser: ${browserName}`);
        }
      
        const permissions = browserName.toLowerCase() === 'chromium'
            ? ['clipboard-read', 'clipboard-write']
            : [];

        let browserContextOptions = {
            ...contextOptions,
            permissions,
            viewport: { width: 1920, height: 1080 }
        };

        if (browserName.toLowerCase() === 'chromium') {
            browserContextOptions.viewport = null;
        }

        context = await browser.newContext(browserContextOptions);
        // await setupBrowser(browser);
        
        const originalNewPage = context.newPage.bind(context);
        context.newPage = async function() {
            const page = await originalNewPage();
            BrowserFactory.extendPage(page);
            return page;
        };
        
        return { context };
    }
    
   static extendPage(page) {
        page.aiVisualCheck = async function(screenshotName, confidence_threshold = 0.8, timeout = 1000, testInfo) {
            try {
                const screenshotPath = path.resolve('./screenshots', screenshotName);
                console.log(`Reference screenshot path: ${screenshotPath}`);
                if (!fs.existsSync(screenshotPath)) {
                    console.warn(`Reference screenshot not found: ${screenshotPath}`);
                    
                    const screenshotDir = path.dirname(screenshotPath);
                    if (!fs.existsSync(screenshotDir)) {
                        fs.mkdirSync(screenshotDir, { recursive: true });
                    }   
                    
                    await page.waitForLoadState('networkidle');
                    await page.waitForTimeout(timeout);
                    await page.screenshot({ path: screenshotPath});
                    console.log(`Created new reference screenshot: ${screenshotPath}`);
                    return {
                        differences: [],
                        elementValidations: [],
                        layoutAssessment: { alignmentIssues: [], spacingIssues: [], responsiveIssues: [] },
                        confidence: 1.0
                    };
                }
                
                console.log(`Performing visual check with reference: ${screenshotPath}`);
                
                const currentDir = path.resolve('./screenshots/current');
                if (!fs.existsSync(currentDir)) {
                    fs.mkdirSync(currentDir, { recursive: true });
                }
                
                const currentScreenshotPath = path.join(currentDir, `current_${Date.now()}.png`);
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(timeout);
                await page.screenshot({ path: currentScreenshotPath });
                
                const referenceImage = fs.readFileSync(screenshotPath).toString('base64');
                const currentImage = fs.readFileSync(currentScreenshotPath).toString('base64');
                
                const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY || 'RY9n4lZWgWmjrWLS36G8vHBTFFjjG2Bm'}`  
                    },
                    body: JSON.stringify({
                        model: "mistral-small-latest",
                        temperature: 0.7,
                        max_tokens: 800,
                        messages: [
                            {
                                role: "user",
                                content: [
                                    {
                                        type: "text",
                                        text: `Compare these two images (reference and current screenshot) and perform a detailed visual regression analysis. Return a response in strict JSON format as follows:
    {
      "confidence_score": <float between 0.0 and 1.0>,
      "differences": [
        {
          "type": "<difference category>",
          "description": "<detailed description>",
          "location": "<specific area or coordinates>",
          "severity": "<low|medium|high>"
        }
      ],
      "element_validations": [
        {
          "element": "<element identifier>",
          "expected_position": "<description of expected position>",
          "actual_position": "<description of actual position>",
          "correctly_positioned": <boolean>,
          "issues": "<any positioning issues found>"
        }
      ],
      "layout_assessment": {
        "alignment_issues": [<list of alignment problems>],
        "spacing_issues": [<list of spacing inconsistencies>],
        "responsive_issues": [<list of potential responsive design problems>]
      }
    }
    
    Instructions:
    1. Verify all UI elements are in their correct positions relative to other elements
    2. Check for alignment issues (vertical and horizontal)
    3. Identify any missing or extra elements
    4. Look for text differences including content, font, size, and styling
    5. Check color differences that might indicate state changes or styling issues
    6. Examine spacing between elements for consistency
    7. Verify that interactive elements (buttons, forms, menus) appear correctly
    8. For confidence_score: 1.0 means identical, 0.0 means completely different
    9. Categorize differences by type: position, layout, color, text, size, visibility, etc.
    10. Rate severity based on functional and visual impact`
                                    },
                                    {
                                        type: "image_url",
                                        image_url: {
                                            url: `data:image/png;base64,${referenceImage}`
                                        }
                                    },
                                    {
                                        type: "image_url",
                                        image_url: {
                                            url: `data:image/png;base64,${currentImage}`
                                        }
                                    }
                                ]
                            }
                        ],
                        response_format: {
                            type: "json_object"
                        }
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                const analysisResult = await response.json();
                
                const content = JSON.parse(analysisResult.choices[0].message.content);
                
                const result = {
                    differences: content.differences || [],
                    elementValidations: content.element_validations || [],
                    layoutAssessment: content.layout_assessment || { 
                        alignmentIssues: [], 
                        spacingIssues: [], 
                        responsiveIssues: [] 
                    },
                    confidence: content.confidence_score || 0
                };
                
                console.log(`Completed visual comparison with confidence: ${result.confidence}`);
                console.log(`Found ${result.differences.length} differences :
 `, result.differences);
                console.log(`Element Validations: `, result.elementValidations);
                console.log(`Confidence Score: `, result.confidence);
                console.log(`Current Screenshot Path: `, currentScreenshotPath);
                console.log(`Base Screenshot Path: `, screenshotPath);
                console.log(`Visual Check completed successfully.`);
                
                if (testInfo) {
                    const reportPath = path.join(testInfo.outputDir, `visual-check-${Date.now()}.json`);
                    
                    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
                    
                    await testInfo.attach('visual-comparison-results', {
                        path: reportPath,
                        contentType: 'application/json'
                    });
                    
                    await testInfo.attach('reference-screenshot', {
                        path: screenshotPath,
                        contentType: 'image/png'
                    });
                    
                    await testInfo.attach('current-screenshot', {
                        path: currentScreenshotPath,
                        contentType: 'image/png'
                    });
                    
                    if (result.differences.length > 0) {
                        testInfo.annotations.push({
                            type: 'visual-differences',
                            description: `Found ${result.differences.length} visual differences`
                        });
                    }
                    
                    if (result.confidence < confidence_threshold) {
                        testInfo.annotations.push({
                            type: 'low-confidence',
                            description: `Visual comparison confidence: ${result.confidence}`
                        });
                    }
                }
                
                if (result.confidence < confidence_threshold) {
                    throw new Error(`Visual comparison failed: Confidence score ${result.confidence} is below threshold ${confidence_threshold}`);
                }
                
                return result;
            } catch (error) {
                console.error('Error during visual check:', error);
                throw error;
            }
        };
        
        return page;
    }
}

module.exports = BrowserFactory;
