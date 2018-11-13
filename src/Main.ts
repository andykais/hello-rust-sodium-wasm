import {loadWasm} from "io/Wasm-Loader";

const isProductionMode = process.env['NODE_ENV'] === "production";
console.log(`v${process.env['BUILD_VERSION']}`);
console.log(`Starting in ${isProductionMode ? "production" : "development"} mode`);

const main = async () => {
    const wasmLib = await loadWasm();

    wasmLib.hello_world();

    var sodium_ctx = wasmLib.sodium_ctx_new();

    //Works!
    const ptr = wasmLib.start_frp(sodium_ctx, "hello from sodium!", x => document.getElementById("text").innerText= x); 

    //Doesn't work...
    wasmLib.send_frp(ptr, 42);
}

main();