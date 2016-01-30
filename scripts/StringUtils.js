/* ************************************************************************* */ 
/*                           STRING SCRIPT HANDLER                           */ 
/* ************************************************************************* */ 
 
function StringUtils() { }

StringUtils.prototype = {
    
    checkIsEmpty: function ( string ) {
        if ( string === undefined )
            return false;
        if ( string.equals("") )   
            return false;
        // stringa non vuota
        return true;
    }
    
}