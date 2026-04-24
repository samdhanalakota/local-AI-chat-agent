import { logger } from "./utils/helper";

// CLI entry point
const main = async (): Promise<void> => {
  try {
    const query = process.argv.slice(2).join(" ");

    if (!query) {
      logger("No input provided", query);
      process.exit(1);
    }

    logger(`Input: ${query}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  }
};

main();
