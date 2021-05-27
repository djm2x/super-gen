import { MapHelper } from "./map.helper";

function main(argvs: string[]) {
    const isDev = process.argv.indexOf('isdev') > -1 ? true : false;

    console.log(argvs)

    const m = new MapHelper(isDev);

    m.onInit();
    // m.mapAngular();
    // m.mapAsp();
    m.mapJava();
    // m.mapIonic();
}

// launch programme
main(process.argv);
