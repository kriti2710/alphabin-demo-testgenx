const { locators } = require('../globalLocator.js');
const { test, expect } = require('@playwright/test');
const BrowserFactory = require('../BrowserFactory.js');
const abPlaywright = require("alphabin-pw");
const config = require('../playwright.config.js');
const { descriptions } = require('../elementDescriptions.js')


let context;

test.beforeEach(async () => {
    const result = await BrowserFactory.createBrowserWithContext(
        config.projects[0].name,
    );
    context = result.context;
});

test.afterEach(async () => {
    await context?.close();
});



test('Alpha_E2E_014 - Verify that User is able to write and submit a product review successfully', async () => {
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.close();
  });

test('Alpha_E2E_015 - Verify that User is able to edit product review successfully', async () => {
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.locator(`//button[text()="Edit"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('testing');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test123@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing test automation');    
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.close();
  });

test('Alpha_E2E_016 - Verify that User is able to delete product review successfully', async () => {
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.locator(`//button[text()="Edit"]`).click({force: true});
    await page1.close();
});

test('Alpha_E2E_001: Verify that the New user is able to Sign Up, Log In, and Navigate to the Home Page Successfully', async () => {
    const uniqe = Math.floor(new Date().getTime() / 1000.0)
    const email = `kriti.test+${uniqe}@gmail.com`;
    const password = `Kriti@#$123`
    // Setup and Initial Navigation
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    console.log("kriti")

    // User Registration Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['Span with Text Sign up'], { description: descriptions['Span with Text Sign up'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).click({ force: true });
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).fill(`Verma`);
    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_002: Verify that a New User Can Successfully Complete the Journey from Registration to a Single Order Placement', async () => {
    const uniqe = Math.floor(new Date().getTime() / 1000.0)
    const email = `kriti.test+${uniqe}@gmail.com`;
    const password = `Kriti@#$123`
    // Setup and Initial Navigation
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);

    // User Registration Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['Span with Text Sign up'], { description: descriptions['Span with Text Sign up'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).click({ force: true });
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).fill(`Verma`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Create Account'], { description: descriptions['Button with Text Create Account'] }).click({ force: true });


    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_003: Verify That a New User Can Successfully Complete the Journey from Registration to a Multiple Order Placement', async () => {
    const uniqe = Math.floor(new Date().getTime() / 1000.0)
    const email = `kriti.test+${uniqe}@gmail.com`;
    const password = `Kriti@#$123`
    // Setup and Initial Navigation
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);

    // User Registration Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['Span with Text Sign up'], { description: descriptions['Span with Text Sign up'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).click({ force: true });
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).fill(`Verma`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Create Account'], { description: descriptions['Button with Text Create Account'] }).click({ force: true });

    // Verification of Registration Success
    await page1.waitForTimeout(1000);
    await expect(page1.locator(locators['Html inside body'], { description: descriptions['Html inside body'] })).toBeVisible();

    // User Login Steps
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Div starting with Text Password'], { description: descriptions['Div starting with Text Password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_004: Verify that User Can View and Cancel an Order from the "My Orders" Section', async () => {
    // Setup and Login
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Cleanup
    await page1.close();
});

