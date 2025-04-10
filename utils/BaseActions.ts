import test, { expect, Locator, Page } from '@playwright/test';

export class BaseActions {
	constructor(readonly page: Page) {}

	/**
	 * This method wait for element to be visible and click on it with step tracking
	 * @param locator - Locator of the element
	 * @param elementName - Name of the element for logging in report
	 * @param timeout - Time to wait for element to be visible
	 */
	async clickOnElement(
		locator: Locator,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Click on element [${elementName}]`, async () => {
				console.log(`Attempting to click on element [${elementName}]`);
				await expect(locator).toBeVisible({ timeout: timeout });
				await locator.click();
				console.log(`Successfully clicked on [${elementName}]`);
			});
		} catch (error) {
			console.error(
				`Failed to click on element [${elementName}], with locator [${locator}]. Error: ${error.message}`
			);
			throw new Error(
				`Error clicking on element: [${elementName}]. Stack trace: ${error.stack}`
			);
		}
	}

	/**
	 * This method wait for element to be visible and fill the element with provided text, with step tracking.
	 * @param locator - Locator of the element
	 * @param text - Text to enter in element
	 * @param elementName - Name of the element for logging in report
	 * @param timeout - Wait for element to be visible.
	 */
	async enterTextInElement(
		locator: Locator,
		text: string,
		elementName: string,
		timeout: number
	): Promise<void> {
		try {
			await test.step(`Enter text in element ${elementName} with locator [${locator}]`, async () => {
				console.log(`Attempting to enter text in element [${elementName}]`);
				await expect(locator).toBeVisible({ timeout: timeout });
				console.log(`Entering [${text}] into [${elementName}] element`);
				await locator.fill(text);
				console.log(`Successfully enter text into [${elementName}]`);
			});
		} catch (error) {
			console.error(
				`Failed to enter text into element [${elementName}] with locator: [${locator}]. Error: [${error.message}]`
			);
			throw new Error(
				`Error entering text inelement [${elementName}]. Stack trace: [${error.stack}]`
			);
		}
	}

	/**
	 * This method choose the option from dropdown element with step tracking.
	 * @param selector - Locator of dropdown element
	 * @param option - Option from dropdown element
	 */
	async selectOptionFromDropdown(
		selector: string,
		option: string
	): Promise<void> {
		try {
			await test.step(`Select option [${option}] from dropdown with locator [${selector}]`, async () => {
				console.log(
					`Attempt to select [${option}] from [${selector}] dropdown element`
				);
				await this.page.selectOption(selector, option);
				console.log(
					`Successfully selected [${option}] from dropdown element with locator [${selector}]`
				);
			});
		} catch (error) {
			console.error(
				`Failed to select [${option}] from dropdown element with locator [${selector}]. Error: [${error.message}]`
			);
			throw new Error(
				`Error selecting the [${option}] from dropdown element with locator [${selector}]. Stack trace: [${error.stack}]`
			);
		}
	}

	/**
	 * This method gets the text content of an element.
	 * @param locator The selector for the element
	 * @returns The text content of the element
	 */
	async getElementText(locator: string): Promise<string> {
		const elementLocator = this.page.locator(locator);
		// Retrieve the text content
		const text = await elementLocator.textContent();
		// Ensure the text is not null or undefined
		if (!text) {
			throw new Error(`Text content not found for element: [${locator}]`);
		}
		console.log(`Return the text from element with locator [${locator}]`);
		return text.trim();
	}
}
