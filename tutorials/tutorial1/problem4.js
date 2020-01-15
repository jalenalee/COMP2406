function landscape() {
    let result_top = "";
    let result_bottom = "";


    function flat(size) {
        for (let count = 0; count < size; count++) {
            result_bottom += "_";
            result_top += " ";
        }
    }

    function hill(size) {
        result_bottom += "/";
        result_top += " ";
        for (let count = 0; count < size; count++) {
            result_top += "_";
            result_bottom += " ";
        }
        result_bottom += "\\";
        result_top += " ";
    }

    //START BUILD SCRIPT
    flat(3);
    hill(4);
    flat(6);
    hill(1);
    flat(1);
    //END BUILD SCRIPT

    // return result

    console.log(result_top);
    console.log(result_bottom);

}

// console.log("")
landscape();