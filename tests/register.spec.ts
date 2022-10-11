import { test, expect } from '@playwright/test'

test.describe('Register page integration test case', () => {
	test('Should display errors when submitting with empty fields', async ({
		page,
	}) => {
		await page.goto('http://127.0.0.1:5173/register')

		await page.locator('data-test-id=register-button').click()
		await expect(page.locator('data-test-id=email-errors')).toHaveText(
			'Campo requerido'
		)
		await expect(page.locator('data-test-id=password-errors')).toHaveText(
			'Campo requerido'
		)
	})
	test('Should display error on password input when the user has not filled the email input', async ({
		page,
	}) => {
		await page.goto('http://127.0.0.1:5173/register')
		await page.locator('data-test-id=email-input').fill('o.gonzalo@hotmail.com')
		await page.locator('data-test-id=register-button').click()
		await expect(page.locator('data-test-id=password-errors')).toHaveText(
			'Campo requerido'
		)
	})

	test('Should display an firebase error if the credentials are incorrect', async ({
		page,
	}) => {
		await page.goto('http://127.0.0.1:5173/register')
		await page.locator('data-test-id=email-input').fill('o.gonzalo@hotmail.com')
		await page.locator('data-test-id=password-input').fill('Asesino3001')
		await page.locator('data-test-id=register-button').click()
		await expect(page.locator('data-test-id=firebase-errors')).toHaveText(
			'Email ya en uso'
		)
	})
})
