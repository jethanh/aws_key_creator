const puppeteer = require('puppeteer');

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

(async () => {
  try {

    const browser = await puppeteer.launch({
		headless: false
	});
    const page = await browser.newPage();

    // Navigate to the AWS IAM page
    await page.goto('https://console.aws.amazon.com/iamv2/home?#/security_credentials');

    // Fill in the necessary information and submit the form
	await page.waitForSelector('#resolving_input');

	// Change to your AWS email
    await page.type('#resolving_input', '<Your AWS Email>');
	await page.waitForSelector('#next_button')
    await page.click('#next_button');

	sleep(3000)

	// Change to your AWS password
    await page.type('#password', 'Your AWS Password');
	await page.click('#signin_button');

    // Wait for the page to load and retrieve the access keys
    await page.waitForSelector('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div:nth-child(5) > div > div > div.awsui_content_14iqq_1buwd_282 > div.awsui_wrapper_wih1l_5nk4n_154.awsui_variant-container_wih1l_5nk4n_163.awsui_has-header_wih1l_5nk4n_170 > table > tbody > tr > td > div > div > div > div.awsui-util-mb-m > button');
	await page.click('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div:nth-child(5) > div > div > div.awsui_content_14iqq_1buwd_282 > div.awsui_wrapper_wih1l_5nk4n_154.awsui_variant-container_wih1l_5nk4n_163.awsui_has-header_wih1l_5nk4n_170 > table > tbody > tr > td > div > div > div > div.awsui-util-mb-m > button');


	await page.waitForSelector('#ack-risk')
	await page.click('#ack-risk')

	await page.click('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div > div > div > div > div > div.awsui_root_1i0s3_uqbt5_93.awsui_form-component_1xupv_1yj7o_334 > div.awsui_footer_1i0s3_uqbt5_118 > div > div > div > div > div:nth-child(2) > button > span')
    
	
	const accessKeyElement = await page.$('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div > div > div > div > div > div.awsui_root_1i0s3_uqbt5_93.awsui_form-component_1xupv_1yj7o_334 > div.awsui_content_1i0s3_uqbt5_110 > div > div > div > div.awsui_root_18wu0_1ea4b_93.awsui_box_18wu0_1ea4b_207.awsui_m-bottom-m_18wu0_1ea4b_880.awsui_color-default_18wu0_1ea4b_207.awsui_font-size-default_18wu0_1ea4b_223.awsui_font-weight-default_18wu0_1ea4b_263 > div > div.awsui_content_14iqq_1buwd_282 > div.awsui_wrapper_wih1l_5nk4n_154.awsui_variant-container_wih1l_5nk4n_163.awsui_has-header_wih1l_5nk4n_170 > table > tbody > tr > td:nth-child(1) > div > div:nth-child(2) > span');
    await page.click('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div > div > div > div > div > div.awsui_root_1i0s3_uqbt5_93.awsui_form-component_1xupv_1yj7o_334 > div.awsui_content_1i0s3_uqbt5_110 > div > div > div > div.awsui_root_18wu0_1ea4b_93.awsui_box_18wu0_1ea4b_207.awsui_m-bottom-m_18wu0_1ea4b_880.awsui_color-default_18wu0_1ea4b_207.awsui_font-size-default_18wu0_1ea4b_223.awsui_font-weight-default_18wu0_1ea4b_263 > div > div.awsui_content_14iqq_1buwd_282 > div.awsui_wrapper_wih1l_5nk4n_154.awsui_variant-container_wih1l_5nk4n_163.awsui_has-header_wih1l_5nk4n_170 > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > a > strong')
	const secretAccessKeyElement = await page.$('#iam-app-my-credentials-page > div > div > div > div > main > div > div:nth-child(3) > div > div > div > div > div > div > div > div.awsui_root_1i0s3_uqbt5_93.awsui_form-component_1xupv_1yj7o_334 > div.awsui_content_1i0s3_uqbt5_110 > div > div > div > div.awsui_root_18wu0_1ea4b_93.awsui_box_18wu0_1ea4b_207.awsui_m-bottom-m_18wu0_1ea4b_880.awsui_color-default_18wu0_1ea4b_207.awsui_font-size-default_18wu0_1ea4b_223.awsui_font-weight-default_18wu0_1ea4b_263 > div > div.awsui_content_14iqq_1buwd_282 > div.awsui_wrapper_wih1l_5nk4n_154.awsui_variant-container_wih1l_5nk4n_163.awsui_has-header_wih1l_5nk4n_170 > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > span');

    const accessKey = await page.evaluate(el => el.textContent, accessKeyElement);
    const secretAccessKey = await page.evaluate(el => el.textContent, secretAccessKeyElement);

    // Print the access keys
    console.log('Access Key:', accessKey.trim());
    console.log('Secret Access Key:', secretAccessKey.trim());

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
