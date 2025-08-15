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
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
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
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
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
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
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

