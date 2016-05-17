/**
 * Filter to truncate a string and show ellipses.
 */
app.filter('truncate', function (){

    var DEFAULT_TRUNCATE_STRING = 10;

    function truncateAndEllipse(text, length, end )
    {
        if ( text === undefined )
            // Nothing to do
            return;

        // Checking if length is a number, otherwise set it to 10
        if ( isNaN(length))
            length = DEFAULT_TRUNCATE_STRING;

        // Checking if end is specified, otherwise set it to "..."
        if ( end === undefined )
            end = "...";

        // If text doesn't overcome the limit . . .
        if ( text.length <= length )
        {
            // . . . returns the text itself . . .
            return text;
        }
        // . . . otherwise limit string . . .
        else
        {
            // . . . but if the "end" string is greater than the limit itself . . .
            if ( end.length > length )
            {
                // . . . if length > 3, i set end to "...", otherwise to empty string . . .
                end = length > 6 ? "..." : "";
            }
            return String( text ).substring(0, length - end.length ) + end;
        }
    }

    return truncateAndEllipse;

});
