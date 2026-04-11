import { test, expect } from '@playwright/test';
import { goToDatafile, login } from './helpers/auth';


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
    await login(page);
    await goToDatafile(page);
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    await expect(page.getByText('Leanne Graham')).toBeVisible();
    await page.getByPlaceholder('Search...').fill('Leanne');
    await expect(page.getByText('Leanne Graham')).toBeVisible();
    await page.getByPlaceholder('Search...').fill('sincere@april.biz');
    await expect(page.getByText('Leanne Graham')).toBeVisible();
})