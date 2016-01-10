
var UL_COORDS = { top: 0, left: 0, width: 0, height: 0 };
var CUR_LI_COORDS = { top: 0, left: 0, width: 0, height: 0 };
var CUR_LI_COORDS = { top: 0, left: 0, width: 0, height: 0 };

$(window).load( function () {
    var divPrefixId = "#prj_";

    console.log( "Getting UL coordinates . . .");
    UL_COORDS = { 
        top: $("#ulElm").position().top,
        left: $("#ulElm").position().left,
        width: $("#ulElm").width(),
        height: $("#ulElm").height()
    };
    
    for ( var i = 1; i < 4; i++)
    {
        var divId = divPrefixId + i;

        
        console.log ( "appending mouseenter to div '" + divId + "' . . . ");
        $( divId ).mouseenter(function() {
                console.log ( "Entering '" + divId + "' . . .");
                $(this).toggleClass("background-li");
                showDatas( divId );
            }
        );
        
        console.log ( "appending mouseleave to div '" + divId + "' . . . ");
        $( divId ).mouseleave(function() {
                console.log ( "Exiting '" + divId + "' . . .");
                hideDatas( divId );
            }
        );
        
    }
});

function showDatas( divId )
{
    var element = $(divId);
    //console.log ( "[" + divId + "] .. retreived element '" + element + "' . . .");
    var position = element.position();
    /*console.log ( "[" + divId + "] .. position is: ");
    console.log ( "[" + divId + "] .... top: " + position.top);
    console.log ( "[" + divId + "] .... left: " + position.left);
    console.log ( "[" + divId + "] .... bottom [ undefined, if correct . . . ]: " + position.bottom);
    console.log ( "[" + divId + "] .... right [ undefined, if correct . . . ]: " + position.right);
    
    var size = element.size();
    console.log ( "[" + divId + "] .. size is: ");
    console.log ( "[" + divId + "] .... width: " + element.width() );
    console.log ( "[" + divId + "] .... heigth: " + element.height() );*/
    
    console.log ( "[" + divId + "] .. the full coordinates are: ");
    console.log ( "[" + divId + "] .... top    : " + position.top );
    console.log ( "[" + divId + "] .... bottom : " + ( position.top + element.height() ) );
    console.log ( "[" + divId + "] .... left   : " + position.left );
    console.log ( "[" + divId + "] .... right  : " + ( position.left + element.width() ) );
    console.log (" [" + divId + "] .. well, saving it to CUR_LI_COORDS variable . . . ");
    CUR_LI_COORDS = { 
            top: $(divId).position().top,
            left: $(divId).position().left,
            width: $(divId).width(),
            height: $(divId).height()
        };
    
    console.log ( "[" + divId + "] .. expanding div to the full UL dimensions . . . " );
    $(divId).animate({
        width: UL_COORDS.width, 
        height: UL_COORDS.height, 
        left: UL_COORDS.left, 
        top: UL_COORDS.top, 
        "z-index": 100 }
        );
    
}

function hideDatas( divId )
{
    console.log ( " [" + divId + "] .. contracting div to old dimensions. . . ");
    $(divId).animate({
        width: CUR_LI_COORDS.width, 
        height: CUR_LI_COORDS.height, 
        left: CUR_LI_COORDS.left, 
        top: CUR_LI_COORDS.top, 
        "z-index": 1 }
        );    
}