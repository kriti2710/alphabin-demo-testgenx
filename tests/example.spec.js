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



test('Amazon product search for laptop', async ({ page }) => {
    // Navigate to Amazon's homepage
    await page.goto('https://www.amazon.in');
    const acceptCookies = page.locator('input[name="accept"]');
    if (await acceptCookies.isVisible()) {
        await acceptCookies.click();
    }
    await page.fill('#twotabsearchtextbox', 'laptop');
    await page.click('#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const results = page.locator('.s-main-slot .s-result-item');
    await expect(results.first()).toBeVisible();
    await results.first().click();
    await page.waitForSelector('#productTitle');
    const productTitle = await page.textContent('#productTitle');
    console.log('Product Title:', productTitle.trim());
});



// Auto generated test case
test('case 1', async () => {
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['SVG_9'], { description: descriptions['SVG_9'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_12'], { description: descriptions['SVG Path inside SVG_12'] }).click({ force: true });
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_001: Verify that the New user is able to Sign Up, Log In, and Navigate to the Home Page Successfully', async () => {
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

    // Verification of Login Success
    await expect(page1.locator(locators['Html'], { description: descriptions['Html'] })).toBeVisible();

    // Post-Login Actions
    await page1.mouse.wheel(1, 1621);
    await page1.mouse.wheel(1, 901);

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

    // Verification of Login Success
    await expect(page1.locator(locators['Html'], { description: descriptions['Html'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Navigate to All Products
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await expect(page1.locator(locators['H1 with Text All Products'], { description: descriptions['H1 with Text All Products'] })).toBeVisible();

    // Add Product to Cart
    await page1.locator(locators['SVG Path inside SVG_2'], { description: descriptions['SVG Path inside SVG_2'] }).click({ force: true });
    await page1.locator(locators['Img with alt Rode NT1-A Condenser Mic'], { description: descriptions['Img with alt Rode NT1-A Condenser Mic'] }).click({ force: true });
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });

    // Product Details and Cart Navigation
    await page1.mouse.wheel(1, 815);
    await page1.locator(locators['Img with alt dp'], { description: descriptions['Img with alt dp'] }).click({ force: true });
    await page1.locator(locators['Button with Text Additional information'], { description: descriptions['Button with Text Additional information'] }).click({ force: true });
    await page1.locator(locators['Button with Text Reviews'], { description: descriptions['Button with Text Reviews'] }).click({ force: true });
    await page1.mouse.wheel(1, -783);
    await page1.mouse.wheel(1, -31);
    await page1.locator(locators['SVG_3'], { description: descriptions['SVG_3'] }).click({ force: true });
    await page1.locator(locators['Html inside body_1'], { description: descriptions['Html inside body_1'] }).click({ force: true });

    // Verify Shopping Cart
    await expect(page1.locator(locators['H1 with Text Shopping Cart'], { description: descriptions['H1 with Text Shopping Cart'] })).toHaveText(`Shopping Cart`);

    // Checkout Process
    await page1.locator(locators['Button with Text'], { description: descriptions['Button with Text'] }).click({ force: true });
    await page1.locator(locators['Span with Text Checkout'], { description: descriptions['Span with Text Checkout'] }).click({ force: true });
    // Fill User Information
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).click({ force: true });
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`kriti.test@gmail.com`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`surat`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`gujarat`);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`silver business point`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`537867`);
    await page1.locator(locators['Html inside body_22'], { description: descriptions['Html inside body_22'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`india`);

    // Save Address
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    // Interaction with the Cash on Delivery Button
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });

    // Interaction with the Place Order Button
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });

    // Verify Order Confirmation 
    await expect(page1.locator(locators['Html inside body_3'], { description: descriptions['Html inside body_3'] })).toBeVisible();
    await expect(page1.locator(locators['H3 with Text Your order is confirmed'], { description: descriptions['H3 with Text Your order is confirmed'] })).toHaveText(`Your order is confirmed`);

    // Cleanup
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

    // Verification of Login Success
    await expect(page1.locator(locators['Html'], { description: descriptions['Html'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Navigate to All Products
    await page1.waitForTimeout(1000);
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await expect(page1.locator(locators['H1 with Text All Products'], { description: descriptions['H1 with Text All Products'] })).toBeVisible();

    // Add Product to Cart
    await page1.locator(locators['SVG Path inside SVG_2'], { description: descriptions['SVG Path inside SVG_2'] }).click({ force: true });
    await page1.locator(locators['Img with alt Rode NT1-A Condenser Mic'], { description: descriptions['Img with alt Rode NT1-A Condenser Mic'] }).click({ force: true });
    await page1.mouse.wheel(1, 258);
    await page1.mouse.wheel(1, 351);

    // Product Details and Cart Navigation
    await page1.locator(locators['Button with Text Additional information'], { description: descriptions['Button with Text Additional information'] }).click({ force: true });
    await page1.locator(locators['Button with Text Reviews'], { description: descriptions['Button with Text Reviews'] }).click({ force: true });
    await page1.mouse.wheel(1, -430);
    await page1.mouse.wheel(1, -156);
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    await page1.mouse.wheel(1, -22);
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.locator(locators['SVG_3'], { description: descriptions['SVG_3'] }).click({ force: true });
    await page1.locator(locators['Html inside body_1'], { description: descriptions['Html inside body_1'] }).click({ force: true });
    await page1.locator(locators['Button with Text'], { description: descriptions['Button with Text'] }).click({ force: true });

    // Verify Shopping Cart
    await expect(page1.locator(locators['H1 with Text Shopping Cart'], { description: descriptions['H1 with Text Shopping Cart'] })).toHaveText(`Shopping Cart`);

    // Checkout Process
    await page1.locator(locators['Span with Text Checkout'], { description: descriptions['Span with Text Checkout'] }).click({ force: true });
    await expect(page1.locator(locators['H1 with Text Checkout'], { description: descriptions['H1 with Text Checkout'] })).toHaveText(`Checkout`);

    // Fill User Information
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).click({ force: true });
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`kriti.test@gmail.com`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`surat`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`gujarat`);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`silver business point`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`537867`);
    await page1.locator(locators['Html inside body_22'], { description: descriptions['Html inside body_22'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`india`);

    // Save Address
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    // Interaction with the Cash on Delivery Button
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });

    // Interaction with the Place Order Button
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_3'], { description: descriptions['Html inside body_3'] })).toBeVisible();

    // Verify Order Confirmation
    await expect(page1.locator(locators['H3 with Text Your order is confirmed'], { description: descriptions['H3 with Text Your order is confirmed'] })).toHaveText(`Your order is confirmed`);
    await page1.mouse.wheel(1, 672);
    await page1.locator(locators['Button with Text Continue Shopping'], { description: descriptions['Button with Text Continue Shopping'] }).click({ force: true });
    await page1.mouse.wheel(1, -671);

    // Navigate to All Products again
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_8'], { description: descriptions['SVG Path inside SVG_8'] }).click({ force: true });

    // Product Details and Cart Navigation
    await page1.locator(locators['Img with alt Seagate 4TB External Hard Drive'], { description: descriptions['Img with alt Seagate 4TB External Hard Drive'] }).click({ force: true });
    await page1.mouse.wheel(1, 321);
    await page1.locator(locators['Button with Text Additional information'], { description: descriptions['Button with Text Additional information'] }).click({ force: true });
    await page1.locator(locators['Button with Text Reviews'], { description: descriptions['Button with Text Reviews'] }).click({ force: true });
    await page1.mouse.wheel(1, -281);

    // Add Product to Cart
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.mouse.wheel(1, -39);
    await page1.locator(locators['Span with Text 2'], { description: descriptions['Span with Text 2'] }).click({ force: true });
    await page1.locator(locators['Html inside body_9'], { description: descriptions['Html inside body_9'] }).click({ force: true });
    await page1.locator(locators['Button with Text'], { description: descriptions['Button with Text'] }).click({ force: true });
    await page1.locator(locators['Span with Text Checkout'], { description: descriptions['Span with Text Checkout'] }).click({ force: true });

    // Checkout Process
    await expect(page1.locator(locators['H1 with Text Checkout'], { description: descriptions['H1 with Text Checkout'] })).toHaveText(`Checkout`);
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_3'], { description: descriptions['Html inside body_3'] })).toBeVisible();
    await expect(page1.locator(locators['H3 with Text Your order is confirmed'], { description: descriptions['H3 with Text Your order is confirmed'] })).toHaveText(`Your order is confirmed`);
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_004: Verify that User Can View and Cancel an Order from the “My Orders” Section', async () => {
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

    // Navigate to Orders Section
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['P with Text Track and manage your orders'], { description: descriptions['P with Text Track and manage your orders'] }).click({ force: true });

    // Verify Orders Section Visibility
    await expect(page1.locator(locators['Div_3'], { description: descriptions['Div_3'] })).toBeVisible();

    // View Order Details
    await page1.locator(locators['Button with Text View'], { description: descriptions['Button with Text View'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_11'], { description: descriptions['Html inside body_11'] })).toBeVisible();

    // Scroll and Navigate Back
    await page1.mouse.wheel(1, 585);
    await page1.mouse.wheel(1, -569);
    await page1.mouse.wheel(1, -15);
    await page1.locator(locators['Button with Text Back to home'], { description: descriptions['Button with Text Back to home'] }).click({ force: true });

    // Navigate to My Orders Section
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['P with Text My Orders'], { description: descriptions['P with Text My Orders'] }).click({ force: true });

    // Cancel Order
    await page1.locator(locators['Button with Text Cancel_1'], { description: descriptions['Button with Text Cancel_1'] }).click({ force: true });
    await expect(page1.locator(locators['Div_2'], { description: descriptions['Div_2'] })).toBeVisible();
    await page1.locator(locators['Button with Text Yes Cancel Order'], { description: descriptions['Button with Text Yes Cancel Order'] }).click({ force: true });

    // Verify Order Cancellation
    await expect(page1.locator(locators['Div with Text Order cancelled successfully'], { description: descriptions['Div with Text Order cancelled successfully'] })).toBeVisible();

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_005: Verify that User Can Add, Edit, and Delete Addresses after Logging In', async () => {
    // Initialization and Navigation
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);

    // Login Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body'], { description: descriptions['Html inside body'] })).toBeVisible();
    await page1.locator(locators['Html inside body_12'], { description: descriptions['Html inside body_12'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Navigate to Addresses Section
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['P with Text Addresses'], { description: descriptions['P with Text Addresses'] }).click({ force: true });
    await expect(page1.locator(locators['H2 with Text My Addresses'], { description: descriptions['H2 with Text My Addresses'] })).toBeVisible();

    // Add New Address
    await page1.locator(locators['Button with Text Add New Address'], { description: descriptions['Button with Text Add New Address'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`kriti`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test93@gmail.com`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`Surat`);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`Silver business point`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`gujarat`);
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`India`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`645767`);
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await expect(page1.locator(locators['Div_8'], { description: descriptions['Div_8'] })).toBeVisible();

    // Update Address
    await page1.locator(locators['SVG Path inside SVG_9'], { description: descriptions['SVG Path inside SVG_9'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`user1233`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`Mumbai`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`Maharashtra`);
    await page1.locator(locators['Button with Text Update Address'], { description: descriptions['Button with Text Update Address'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();

    // Delete Address
    await page1.locator(locators['SVG Path inside SVG_10'], { description: descriptions['SVG Path inside SVG_10'] }).click({ force: true });
    await expect(page1.locator(locators['Div_5'], { description: descriptions['Div_5'] })).toBeVisible();
    await expect(page1.locator(locators['Button with Text Delete'], { description: descriptions['Button with Text Delete'] })).toBeEnabled();
    await page1.locator(locators['Button with Text Delete'], { description: descriptions['Button with Text Delete'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_006: Verify that User Can Update Personal Information and Change Password', async () => {
    // Initial Setup
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);

    // Login Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1.locator(locators['H2 with Text Sign In'], { description: descriptions['H2 with Text Sign In'] })).toBeVisible();
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Navigate to Shop
    await page1.locator(locators['Html_2'], { description: descriptions['Html_2'] }).click({ force: true });
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });

    // Access User Profile
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Div_7'], { description: descriptions['Div_7'] })).toBeVisible();

    // Update User Information
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`kriti`);
    await page1.locator(locators['Input with name contact Number'], { description: descriptions['Input with name contact Number'] }).click({ force: true });
    await page1.locator(locators['Input with name contact Number'], { description: descriptions['Input with name contact Number'] }).fill(`9794134352`);
    await page1.locator(locators['Button with Text Save Changes'], { description: descriptions['Button with Text Save Changes'] }).click({ force: true });
    //await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Update Password
    await page1.locator(locators['Button with Text Security'], { description: descriptions['Button with Text Security'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name confirm Password'], { description: descriptions['Input with name confirm Password'] }).click({ force: true });
    await page1.locator(locators['Input with name confirm Password'], { description: descriptions['Input with name confirm Password'] }).fill(`Test@12345`);
    await page1.locator(locators['Button with Text Update Password'], { description: descriptions['Button with Text Update Password'] }).click({ force: true });
    // await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Log Out
    await page1.locator(locators['P with Text Log Out'], { description: descriptions['P with Text Log Out'] }).click({ force: true });
    //await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await expect(page1.locator(locators['Html inside body'], { description: descriptions['Html inside body'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Re-login
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_007: Verify that a User Can Filter Products by Price Range', async () => {
    // Setup and Initialization
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);

    // Login Steps
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body'], { description: descriptions['Html inside body'] })).toBeVisible();
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Navigate to Products Page
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });

    // Apply Price Filter
    await page1.locator(locators['Div with Text Filters'], { description: descriptions['Div with Text Filters'] }).click({ force: true });
    await page1.locator(locators['Span with Text Filters'], { description: descriptions['Span with Text Filters'] }).click({ force: true });
    await page1.locator(locators['Input with value 24000'], { description: descriptions['Input with value 24000'] }).click({ force: true });
    await page1.locator(locators['Input with value 0'], { description: descriptions['Input with value 0'] }).fill(`24000`);
    await page1.locator(locators['SVG_6'], { description: descriptions['SVG_6'] }).click({ force: true });
    await page1.locator(locators['SVG_7'], { description: descriptions['SVG_7'] }).click({ force: true });
    await page1.locator(locators['Input with value 36000'], { description: descriptions['Input with value 36000'] }).click({ force: true });
    await page1.locator(locators['Input with value 24000'], { description: descriptions['Input with value 24000'] }).fill(`36000`);
    await expect(page1.locator(locators['Html inside body_13'], { description: descriptions['Html inside body_13'] })).toBeVisible();

    // Verify and Reset Filters
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).click({ force: true });
    await page1.locator(locators['Button with Text Filters'], { description: descriptions['Button with Text Filters'] }).click({ force: true });
    await page1.locator(locators['Input with value 41000'], { description: descriptions['Input with value 41000'] }).click({ force: true });
    await page1.locator(locators['Input with value 0'], { description: descriptions['Input with value 0'] }).fill(`41000`);
    await page1.locator(locators['Button with Text Reset Filters'], { description: descriptions['Button with Text Reset Filters'] }).click({ force: true });
    await page1.locator(locators['Html inside body_10'], { description: descriptions['Html inside body_10'] }).click({ force: true });
    await page1.locator(locators['Html inside body_10'], { description: descriptions['Html inside body_10'] }).selectOption('uncategorized');
    await page1.locator(locators['Button with Text Reset All Filters'], { description: descriptions['Button with Text Reset All Filters'] }).click({ force: true });

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_008: Verify that User Can Complete the Journey from Login to Order Placement', async () => {
    // Setup and Initial Navigation
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body'], { description: descriptions['Html inside body'] })).toBeVisible();

    // User Sign Up and Login
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`test01@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Test@12345`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).press(`Enter`);

    // Navigate to Product Page
    await page1.waitForTimeout(1000);
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_4'], { description: descriptions['SVG Path inside SVG_4'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_8'], { description: descriptions['SVG Path inside SVG_8'] }).click({ force: true });
    await page1.locator(locators['Img with alt JBL Charge 4 Bluetooth Speaker'], { description: descriptions['Img with alt JBL Charge 4 Bluetooth Speaker'] }).click({ force: true });

    // Product Details and Add to Cart
    await page1.mouse.wheel(1, 558);
    await page1.mouse.wheel(1, 4);
    await page1.locator(locators['Button with Text Additional information'], { description: descriptions['Button with Text Additional information'] }).click({ force: true });
    await page1.locator(locators['Button with Text Reviews'], { description: descriptions['Button with Text Reviews'] }).click({ force: true });
    await page1.mouse.wheel(1, -561);
    await page1.locator(locators['Span with Text 2'], { description: descriptions['Span with Text 2'] }).click({ force: true });
    await page1.locator(locators['Button with Text Add to Cart_1'], { description: descriptions['Button with Text Add to Cart_1'] }).click({ force: true });
    await page1.locator(locators['Button with Text Add to Cart'], { description: descriptions['Button with Text Add to Cart'] }).click({ force: true });
    // await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();

    // Navigate to Shopping Cart
    await page1.locator(locators['Html inside body_9'], { description: descriptions['Html inside body_9'] }).click({ force: true });
    await page1.mouse.wheel(1, 319);
    await page1.mouse.wheel(1, -318);
    await expect(page1.locator(locators['H1 with Text Shopping Cart'], { description: descriptions['H1 with Text Shopping Cart'] })).toHaveText(`Shopping Cart`);
    await page1.mouse.wheel(1, 262);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await page1.mouse.wheel(1, -261);
    await expect(page1.locator(locators['H1 with Text Checkout'], { description: descriptions['H1 with Text Checkout'] })).toHaveText(`Checkout`);
    await expect(page1.locator(locators['Html inside body_14'], { description: descriptions['Html inside body_14'] })).toBeVisible();

    // Place Order
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_15'], { description: descriptions['Html inside body_15'] })).toBeVisible();
    await expect(page1.locator(locators['H3 with Text Your order is confirmed'], { description: descriptions['H3 with Text Your order is confirmed'] })).toHaveText(`Your order is confirmed`);

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_010: Verify that the New User Can View and Cancel an Order from the “My Orders” Section ', async () => {
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

    // Verification of Login Success
    await expect(page1.locator(locators['Html'], { description: descriptions['Html'] })).toBeVisible();
    await page1.waitForTimeout(1000);

    // Product Selection and Addition to Cart
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['Li with Text All Products'], { description: descriptions['Li with Text All Products'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_4'], { description: descriptions['SVG Path inside SVG_4'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG_8'], { description: descriptions['SVG Path inside SVG_8'] }).click({ force: true });
    await page1.locator(locators['SVG_3'], { description: descriptions['SVG_3'] }).click({ force: true });
    await page1.locator(locators['Button with Text Add to Cart_2'], { description: descriptions['Button with Text Add to Cart_2'] }).click({ force: true });
    await page1.locator(locators['Button with Text Add to Cart'], { description: descriptions['Button with Text Add to Cart'] }).click({ force: true });

    // Proceed to Checkout
    await page1.locator(locators['Html inside body_9'], { description: descriptions['Html inside body_9'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_2'], { description: descriptions['Html inside body_2'] })).toBeVisible();
    await page1.mouse.wheel(1, 536);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await page1.mouse.wheel(1, -535);

    // Fill Shipping Information
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).click({ force: true });
    await page1.locator(locators['Input with name first Name'], { description: descriptions['Input with name first Name'] }).fill(`Kriti`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`kriti@gmail.com`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`surat`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`gujarat`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`435464`);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`silver business point`);
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`india`);
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    await expect(page1.locator(locators['Div with Text Address added successfully'], { description: descriptions['Div with Text Address added successfully'] })).toBeVisible();

    // Place Order
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_3'], { description: descriptions['Html inside body_3'] })).toBeVisible();
    await page1.mouse.wheel(1, 86);
    await expect(page1.locator(locators['H3 with Text Your order is confirmed'], { description: descriptions['H3 with Text Your order is confirmed'] })).toHaveText(`Your order is confirmed`);
    await page1.mouse.wheel(1, -85);

    // Order Management
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['P with Text My Orders'], { description: descriptions['P with Text My Orders'] }).click({ force: true });
    await expect(page1.locator(locators['Div_8'], { description: descriptions['Div_8'] })).toBeVisible();
    await page1.locator(locators['Button with Text View'], { description: descriptions['Button with Text View'] }).click({ force: true });
    await expect(page1.locator(locators['Html inside body_25'], { description: descriptions['Html inside body_25'] })).toBeVisible();
    await page1.locator(locators['SVG_2'], { description: descriptions['SVG_2'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['P with Text Track and manage your orders'], { description: descriptions['P with Text Track and manage your orders'] }).click({ force: true });
    await page1.locator(locators['Button with Text Cancel'], { description: descriptions['Button with Text Cancel'] }).click({ force: true });
    await expect(page1.locator(locators['Div_11'], { description: descriptions['Div_11'] })).toBeVisible();
    await expect(page1.locator(locators['Button with Text Yes Cancel Order'], { description: descriptions['Button with Text Yes Cancel Order'] })).toBeEnabled();
    await page1.locator(locators['Button with Text Yes Cancel Order'], { description: descriptions['Button with Text Yes Cancel Order'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();

    // Cleanup
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_09 - Verify that a User Can Add an Item to Wishlist, Then Move It to Cart and Checkout', async () => {
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1.locator(locators['H1 with Text Demo E-commerce Testing Store'], { description: descriptions['H1 with Text Demo E-commerce Testing Store'] })).toHaveText(`Demo E-commerce Testing Store`);
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).fill(`sp`);
    await expect(page1.locator(locators['H2 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H2 with Text JBL Charge 4 Bluetooth Speaker'] })).toBeVisible();
    await page1.locator(locators['H2 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H2 with Text JBL Charge 4 Bluetooth Speaker'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/product-detail/product2`);
    await expect(page1.locator(locators['H1 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H1 with Text JBL Charge 4 Bluetooth Speaker'] })).toHaveText(`JBL Charge 4 Bluetooth Speaker`);
    await expect(page1.locator(locators['P with Text  12 000'], { description: descriptions['P with Text  12 000'] })).toHaveText(`₹12,000`);
    await expect(page1.locator(locators['Div with Text 1'], { description: descriptions['Div with Text 1'] })).toBeVisible();
    await expect(page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] })).toHaveText(`ADD TO CART`);
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    // await page1.aiVisualCheck('screenshot_1748508693117.png', 0.8, 1000);
    //await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    // await page1.aiVisualCheck('screenshot_1748508698949.png', 0.8, 1000);
    await expect(page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] })).toBeVisible();
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`hiren.alphabin+1@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Hiren@#$123`);
    await expect(page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] })).toHaveText(`Sign in`);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await expect(page1.locator(locators['SVG'], { description: descriptions['SVG'] })).toBeVisible();
    await page1.locator(locators['Span with Text 1'], { description: descriptions['Span with Text 1'] }).click({ force: true });
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] })).toHaveText(`Checkout`);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    // await expect(page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] })).toBeVisible();
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    // await expect(page1.locator(locators['H1 with Text Order Details'], { description: descriptions['H1 with Text Order Details'] })).toBeVisible(); const page1 = await context.newPage();
    console.log('✅ All steps completed — now closing the browser tab.');
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_011 - Verify that the New User is able to add Addresses in the Address section', async () => {

    const uniqe = Math.floor(new Date().getTime() / 1000.0)
    const email = `hiren.alphabin+${uniqe}@gmail.com`;
    const password = `Hiren@#$123`
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await page1.locator(locators['Span with Text Sign up'], { description: descriptions['Span with Text Sign up'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/signup`);
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Hiren`);
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).press(`Tab`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).fill(`Test`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).press(`Tab`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Create Account'], { description: descriptions['Button with Text Create Account'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/account`);
    await expect(page1).toHaveTitle(`AB | My Account`);
    await page1.locator(locators['H2 with Text My Profile'], { description: descriptions['H2 with Text My Profile'] }).click({ force: true });
    await expect(page1).toHaveTitle(`AB | My Account`);
    await page1.locator(locators['P with Text Addresses'], { description: descriptions['P with Text Addresses'] }).click({ force: true });
    await expect(page1).toHaveTitle(`AB | My Account`);
    await page1.locator(locators['Button with Text Add Your First Address'], { description: descriptions['Button with Text Add Your First Address'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Hiren`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`123/testing`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`test`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`local`);
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`earth`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`395013`);
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.close();

});



// Auto generated test case
test('Alpha_E2E_012 - login to logout', async () => {

    const email = `hiren.alphabin+1@gmail.com`;
    const password = `Hiren@#$123`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/account`);
    await expect(page1).toHaveTitle(`AB | My Account`);
    await page1.waitForTimeout(5000);
    await page1.locator(locators['P with Text Log Out'], { description: descriptions['P with Text Log Out'] }).click({ force: true });
    await page1.close();
});


// Auto generated test case
test('Alpha_E2E_013 - Verify that the User Can Add a Product to Cart Before Login and Complete the Order After Logging In', async () => {
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).fill(`mouse`);
    await page1.locator(locators['H2'], { description: descriptions['H2'] }).click({ force: true });
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await expect(page1.locator(locators['H3'], { description: descriptions['H3'] })).toHaveText(`Logitech MX Master 3 Wireless Mouse`);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`hiren.alphabin+1@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Hiren@#$123`);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await expect(page1.locator(locators['H3'], { description: descriptions['H3'] })).toBeVisible();
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co`);
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/checkout`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await page1.locator(locators['Html inside body_4'], { description: descriptions['Html inside body_4'] }).click({ force: true });
    await page1.waitForTimeout(15000);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/checkout`);
    await page1.waitForTimeout(10000);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.waitForTimeout(10000);
    console.log('✅ All steps completed — now closing the browser tab.');
    await page1.close();
});
