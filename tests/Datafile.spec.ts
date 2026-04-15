import { test, expect } from '@playwright/test';


test('verify api response',async({ page}) => {
    page.on('response',response => {
        if(response.url() === 'https://jsonplaceholder.typicode.com/users' && response.status() === 200){
            console.log('API call successful');
            const body = response.json();
            console.log('Response body:', body);
            response.json().then(data=> {
                expect(data).toHaveProperty('name');
                expect(data).toHaveProperty('email');
            })
        }
    })
})

test('should load datafile',async ({ page }) => {  
    // Global setup has already authenticated - just navigate to the app
    await page.goto('/');
    // Navigate to Datafile using the button
    await page.getByRole('button', { name: 'Datafile' }).click();
    await expect(page.getByRole('heading', { name: 'Employee Directory' })).toBeVisible();
    
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    await expect(page.getByText('Leanne Graham')).toBeVisible();
    await page.getByPlaceholder('Search...').fill('Leanne');
    await expect(page.getByText('Leanne Graham')).toBeVisible();
    await page.getByPlaceholder('Search...').fill('sincere@april.biz');
    await expect(page.getByText('Leanne Graham')).toBeVisible();
})


test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible({ timeout: 10000 });
});

test('gets the json from api and adds a new fruit', async ({ page }) => {
  // Get the response and add to it
  await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Loquat', id: 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  // Assert that the new fruit is visible
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible();
});
