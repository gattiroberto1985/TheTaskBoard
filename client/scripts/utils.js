/**
 * The method returns an UID generated
 */
function getUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(
                /[xy]/g,
                function(c)
                {
                    var r = Math.random()*16 | 0, v = c== 'x' ? r :r & 0x3 |0x8 ;
                    return v.toString(16);
                }
        );
}

/**
 *
 * Checks for the equality of json object.
 *
 * @param source the first element to search
 * @param target the second element to search
 * @throws error if one of the parameters is null/undefined
 */
function _equals(source, target)
{
    if ( source === undefined || target === undefined || source == null || target == null )
        throw "ERROR: You must specify two valid objects!";

    var sourceKeys = [ ];
    var targetKeys = [ ];

    // Registering first-level keys . . .
    for ( var key in source )
        // adding key if is specific property of source and is not already
        // present in the keys-array
        if ( source.hasOwnProperty(key) && sourceKeys.indexOf ( key ) == -1 && key != "$$hashKey" )
            sourceKeys.push(key);

    // Same thing for the target array . . .
    for ( var key in target )
        if ( target.hasOwnProperty(key) && targetKeys.indexOf ( key ) == -1 && key != "$$hashKey" )
            targetKeys.push(key);

    // Exiting with false if keys number is different between source and target
    if ( sourceKeys.length != targetKeys.length )
        return false;

    // for every key in source array (not necessary the check of target key
    // in the source array, due to the prevent-duplicate and same dimensions). . .
    for ( var i = 0; i < sourceKeys.length; i++ )
    {
        // check if the key exists in the target array
        var targetKeyIdx = targetKeys.indexOf( sourceKeys[i]);
        if ( targetKeyIdx == -1 )
            return false;
        else {
            // checking property values . . .
            if ( ! (source[sourceKeys[i]] === target[targetKeys[targetKeyIdx]] ) )
                return false;
        }
    }

    return true;
}
