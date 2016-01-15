
var UL_COORDS = { top: 0, left: 0, width: 0, height: 0 };
var CUR_LI_COORDS = { top: 0, left: 0, width: 0, height: 0 };
var OLD_LI_COORDS = { top: 0, left: 0, width: 0, height: 0 };

var ANIMATION_IN_PROGRESS = false;
$(window).load( function () {
    
    var divPrefixId = "#prj_";
    for ( var i = 1; i < 4; i++)
    {
        var divId = divPrefixId + i;        
        console.log ( "appending mouseenter to div '" + divId + "' . . . ");
        $( divId ).click({ }, function ( event ) {
           showDetails($(this)) ;
        });
    }
    
    
    /*console.log( "Getting UL coordinates . . .");
    UL_COORDS = { 
        top: $("#ulElm").position().top,
        left: $("#ulElm").position().left,
        width: $("#ulElm").width(),
        height: $("#ulElm").height()
    };*/
    
    /*for ( var i = 1; i < 4; i++)
    {
        var divId = divPrefixId + i;

        
        console.log ( "appending mouseenter to div '" + divId + "' . . . ");
        $( divId ).mouseenter(function() {
            if ( ANIMATION_IN_PROGRESS ) 
            {
                console.log ( "Another animation is in progress! ");
                return;
            }
            ANIMATION_IN_PROGRESS = true;
            var element = $(this);
            var divId = $(this).attr("id");
            console.log(" [ " + divId + " ] ... Cleaning mouseleave listener . . . ");
            element.mouseleave(null);
            // getting div datas...
            console.log(" [ " + divId + " ] ... Getting div datas . . . ");
            var elTop = element.position().top, 
                elLeft = element.position().left,
                elWidth = element.width(), 
                elHeight = element.height(),
                elParent = element.parent(),
                pwidth = elParent.width(),
                pHeight = elParent.height();
            console.log(" [ " + divId + " ] outerWidth: " + element.outerWidth() + " -- innerWidth: " + element.innerWidth() + " -- width: " + element.width());
            console.log(" [ " + divId + " ] ... Top: " + elTop + " -- left: " + elLeft + " -- width: " + elWidth + " -- height: " + elHeight + " -- parent Width: " + pwidth + " -- parent Height: " + pHeight );
            // When the mouse enter:
            //  - the div should expand to the parent dimensions;
            //  - all the siblings must hide;
            console.log(" [ " + divId + " ] Removing class 'col-md-4' and animating resize . . .");    
            element.removeClass("col-md-4").css( { 'top': elTop, 'left': elLeft} ).animate( { 'top': 0, 'left': 0, 'width': pwidth, 'height': pHeight, 'zIndex': 100}, 1000 );
            console.log(" [ " + divId + " ] Hiding siblings . . .");
            //element.siblings().hide(400, function () { console.log("Hidden all brothers but $(this)"); });
            
            
            console.log(" [ " + divId + " ] Defining listener for mouseleave element . . .");
            element.mouseleave( {'elTop': elTop, 'elLeft': elLeft, 'elWidth': elWidth, 'elHeight': elHeight }, function( event ) {
                if ( ANIMATION_IN_PROGRESS ) 
                {
                    console.log ( "Another animation is in progress! ");
                    return;
                }       
                ANIMATION_IN_PROGRESS = true;
                var mySelf = $(this);
                var curTop = 0, curLeft = 0;
                console.log(" [ " + mySelf.attr("id") + " ] Adding class 'col-md-4' and animating resize [ 'width': " + elWidth + ", 'height': " + elHeight + " ]. . .");    
                console.log(" [ " + mySelf.attr("id") + " ] FROM: top=" + curTop + " -- left=" + curLeft );
                console.log(" [ " + mySelf.attr("id") + " ] TO  : top=" + elTop + " -- left=" + elLeft + ", with width=" + elWidth + " and height=" + elHeight);
                mySelf.addClass("col-md-4").css( { 'top': curTop, 'left': curLeft } ).animate( { 'top': elTop, 'left': elLeft, 'width': elWidth, 'height': elHeight, 'zIndex': 1 }, 1000 );
                mySelf.siblings().show();
                ANIMATION_IN_PROGRESS = false;
            });
            ANIMATION_IN_PROGRESS = false;
            */
/*                //elClone.append(par);
                .mouseleave(function () {
                    var inElement = $(this);
                    inElement.addClass("col-md-4").animate(
                    {
                        'top': elTop,
                        'elLeft': elLeft,
                        'width': elWidth,
                        'height': elHeight,
                        'zIndex': 1
                    }, 100).siblings().show(400); //animate( { 'opacitiy': 1}, 1000).siblings().animate( { 'opacity': 0.1 }, 1000);
                    
                });*/
                //console.log ( "Entering '" + $(this).attr("id") + "' . . .");
                //$(this).switchClass("col-md-4", "col-md-12", 400, "swing", function () { console.log("4 -> 12 : transition completed"); transformFields($(this), 'edit'); });
                //$(this).toggleClass("selectedTask");
                //$(this).css("z-index", "1000");
                //showDatas( $(this) );
           // }
       // );
        
        /*console.log ( "appending mouseleave to div '" + divId + "' . . . ");
        $( divId ).mouseleave(function() {
                $(this).siblings().show(400, function () { console.log("Showing all brothers previously hidden"); });
                //console.log ( "Exiting '" + divId + "' . . .");
                //$(this).switchClass("col-md-12", "col-md-4", 400, "swing", function () { console.log("12 -> 4 : transition completed"); transformFields($(this), 'block'); });
                //$(this).toggleClass("selectedTask");
                $(this).css("z-index", "1");
               // hideDatas( $(this) );
            }
        );*/
        
    //}
});

function showDetails(element)
{
    console.log("Hiding container and showing overlay . . .");
    $("#container").hide(400)
    $("#overlay").show(400);
}

function updateProject()
{
    console.log("Hiding overlay and showing container . . .");
    $("#overlay").hide(400);    
    $("#container").show(400);
}

function transformFields(element, newMode)
{
    console.log("Transforming elements to '" + newMode + "' mode . . ." );
    switch ( newMode )
    {
        case 'edit':
            {
                element.find("h3.prj_id").replaceWith(function(){
                    console.log('<input type="text" class="' + $(this).attr("class") + '" value="' + $(this).text() + '">');
                    return '<input type="text" class="' + $(this).attr("class") + '" value="' + $(this).text() + '">';
                });
                break;
            }
        case 'block':
            {
               element.find("input.prj_id").replaceWith(function(){
                   console.log( '<h3 class="' + $(this).attr("class") + '">' + $(this).val() + '</h3>');
                    return '<h3 class="' + $(this).attr("class") + '">' + $(this).val() + '</h3>';
                });   
                break;
            }
        default: 
            throw "Mode '" + newMode + "' not valid!";
    }
}

/* DEPRECATED AND TESTS */

function showDatas( element )
{
    //console.log ( "[" + divId + "] .. retreived element '" + element + "' . . .");
    var position = element.position();
    var divId = element.attr("id");
    /*console.log ( "[" + divId + "] .. position is: ");
    console.log ( "[" + divId + "] .... top: " + position.top);
    console.log ( "[" + divId + "] .... left: " + position.left);
    console.log ( "[" + divId + "] .... bottom [ undefined, if correct . . . ]: " + position.bottom);
    console.log ( "[" + divId + "] .... right [ undefined, if correct . . . ]: " + position.right);
    
    var size = element.size();
    console.log ( "[" + divId + "] .. size is: ");
    console.log ( "[" + divId + "] .... width: " + element.width() );
    console.log ( "[" + divId + "] .... heigth: " + element.height() );*/
    
    /*console.log ( "[" + divId + "] .. the full coordinates are: ");
    console.log ( "[" + divId + "] .... top    : " + position.top );
    console.log ( "[" + divId + "] .... bottom : " + ( position.top + element.height() ) );
    console.log ( "[" + divId + "] .... left   : " + position.left );
    console.log ( "[" + divId + "] .... right  : " + ( position.left + element.width() ) );
    console.log (" [" + divId + "] .. well, saving it to CUR_LI_COORDS variable . . . ");*/
    CUR_LI_COORDS = { 
            top: element.position().top,
            left: element.position().left,
            width: element.width(),
            height: element.height()
        };
    
    console.log ( "[" + divId + "] .. expanding div '" + element.attr("id") + "' to the full UL dimensions: " + 
                                                                          "{ top: '" + UL_COORDS.top + 
                                                                         "', left: '" + UL_COORDS.left + 
                                                                         "', width: '" + UL_COORDS.width + 
                                                                         "', height: '" + UL_COORDS.height + "' . . . ");
    element.animate({
        width: UL_COORDS.width, 
        height: UL_COORDS.height, 
        left: UL_COORDS.left, 
        top: UL_COORDS.top,
        zIndex: 1000}
        );
    //element.css("z-index", "1000");
    
}

function hideDatas( element )
{
    var divId = element.attr("id");
    console.log ( " [" + divId + "] .. contracting div to old dimensions : { top: '" + CUR_LI_COORDS.top + 
                                                                         "', left: '" + CUR_LI_COORDS.left + 
                                                                         "', width: '" + CUR_LI_COORDS.width + 
                                                                         "', height: '" + CUR_LI_COORDS.height + "' . . . ");
    element.animate({
        width: CUR_LI_COORDS.width, 
        height: CUR_LI_COORDS.height, 
        left: CUR_LI_COORDS.left, 
        top: CUR_LI_COORDS.top,
        zIndex: 1}
        );    
    //element.css("z-index", "1");
}