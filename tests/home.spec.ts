import { test, expect } from '@playwright/test'

test.describe('Private homepage test integration', () => {
	test('Should display the empty favourites message if the user is logged in', async ({
		page,
	}) => {
		await page.goto('http://127.0.0.1:5173/login')
		await page.locator('data-test-id=email-input').fill('o.gonzalo@hotmail.com')
		await page.locator('data-test-id=password-input').fill('Asesino3001')
		await page.locator('data-test-id=login-button').click()
		await expect(page.locator('data-test-id=empty-favourites')).toHaveText(
			'Parece que no tienes recetas escogidas por el momento.'
		)
	})
	test('Should add an recipe to favourite and display it on home page', async ({
		page,
		browser,
	}) => {
		const context = browser.newContext()
		await page.goto('http://127.0.0.1:5173/login')
		await page.locator('data-test-id=email-input').fill('o.gonzalo@hotmail.com')
		await page.locator('data-test-id=password-input').fill('Asesino3001')
		await page.locator('data-test-id=login-button').click()
		await expect(page.locator('data-test-id=empty-favourites')).toHaveText(
			'Parece que no tienes recetas escogidas por el momento.'
		)

		//It should go to '/home/recipes' page and add an new recipe to favourites.
		await page.locator('data-test-id=view-recipes').click()
		await expect(page.locator('data-test-id=loading-skeleton')).toBeVisible()
		await page.waitForTimeout(10000)
		await page
			.locator('data-test-id=add-White Chocolate Lemon Japanese Cheesecake')
			.click()
		await page.locator('data-test-id=home').click()
		await expect(page.locator('data-test-id=favourite-recipes')).toBeVisible()
	})
})
