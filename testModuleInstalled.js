try {
    console.log(require.resolve("selenium-webdriver"));
} catch(e) {
    console.error("selenium is not found");
    process.exit(e.code);
}