/* ************************************************************************* */
/*                           STRING SCRIPT HANDLER                           */
/* ************************************************************************* */

function StringUtils() { }

StringUtils.prototype = {

    isEmpty: function ( string ) {
        if ( string === undefined )
            return false;
        if ( string.equals("") )
            return false;
        // stringa non vuota
        return true;
    },

    isNumber: function ( string ) {
        var re = new RegExp("^[0-9]+$");
        return re.test(string);
    },

    isLiteral: function ( string ) {
        var re = new RegExp("^[A-Za-z]+$");
        return re.test(string);
    }

}
