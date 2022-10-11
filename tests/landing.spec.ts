import { test, expect } from '@playwright/test'

test('Homepage landing integration test case', async ({ page }) => {
	await page.goto('http://127.0.0.1:5173/')
	await expect(page).toHaveTitle('Bienvenido a Foodyx!')
	const LandingHeading = page.locator(
		'text=Encuentra recetas que te salvarán de tus mediodías!'
	)
	await expect(LandingHeading).toBeVisible()
})
