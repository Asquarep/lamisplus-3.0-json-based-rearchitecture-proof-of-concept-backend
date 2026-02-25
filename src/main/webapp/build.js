import { copy } from "fs-extra";

async function run() {
    await copy("dist", "../resources/static");
    console.log("Copied build files!");
}
run();