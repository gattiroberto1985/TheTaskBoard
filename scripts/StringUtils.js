/* ************************************************************************* */
/*                           STRING SCRIPT HANDLER                           */
/* ************************************************************************* */

function StringUtils() { }

StringUtils.prototype = {

    isEmpty: function ( string ) {
        if ( string === undefined )
            return false;
        var re = new RegExp('^[ \t]');
        return re.test(string);
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
