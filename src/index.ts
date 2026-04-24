import { logger } from "./utils/helper";
import { runAgent } from "./agent";

// CLI entry point
const main = async (): Promise<void> => {
  try {
    const query = process.argv.slice(2).join(" ");

    logger("══════════════════════════════════════");
    logger("       imOE Local AI Agent           ");
    logger("══════════════════════════════════════");

    if (!query) {
      logger("NO INPUT PROVIDED");
      process.exit(1);
    }
    logger(`INPUT: ${query}`);
    await runAgent(query);
  } catch (error) {
    logger(`FAILED: ${error instanceof Error ? `${error.message}` : "Unknown error"}`);
    process.exit(1);
  }
};

main();
