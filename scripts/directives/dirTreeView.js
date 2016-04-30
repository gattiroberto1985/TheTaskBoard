app.directive('angularTreeview', function( $compile ) {
    /*'use strict';
    var treeViewDirective = {
        restrict: 'E', // only use this directive as html tag
        template: '<h1>I come from the directive!</h1>'
    };

    return treeViewDirective;*/
    		return {
    			restrict: 'A',
                scope: false, // let's inherit the parent controller scope!
    			link: function ( scope, element, attrs ) {
    				//tree id
    				var treeId = attrs.treeId;

    				//tree model
    				var treeModel = attrs.treeModel;

    				//node id
    				var nodeId = attrs.nodeId || 'id';

    				//node label
    				var nodeLabel = attrs.nodeLabel || 'label';

    				//children
    				var nodeChildren = attrs.nodeChildren || 'children';

            //console.log ( "treeId: " + treeId + " -- Treemodel: " + treeModel + " -- nodeId: " + nodeId + " -- nodeLabel: " + nodeLabel + " -- nodeChildren: " + nodeChildren);

    				//tree template
    				var template =
    					'<ul>' +
    						'<li data-ng-repeat="node in ' + treeModel + '">' +
    							'<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
    							'<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
    							'<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
    							'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
                                '<button class="glyphicon glyphicon-plus" ng-click="createSubTask(node)"></button>' + 
                                '<button class="glyphicon glyphicon-minus" ng-click="deleteTask(node)"></button>' +
    							'<div data-angular-treeview="true" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
    						'</li>' +
    					'</ul>';


    				//check tree id, tree model
    				if( treeId && treeModel ) {

    					//root node
    					if( attrs.angularTreeview ) {

    						//create tree object if not exists
    						scope[treeId] = scope[treeId] || {};

    						//if node head clicks,
    						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

    							//Collapse or Expand
    							selectedNode.collapsed = false; // !selectedNode.collapsed;
                                //console.log ( " Selected task '" + JSON.stringify( selectedNode ) + "'");
                                scope.setEditedTask( selectedNode );
    						};

    						//if node label clicks,
    						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

    							//remove highlight from previous node
    							if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
    								scope[treeId].currentNode.selected = undefined;
    							}

    							//set highlight to selected node
    							selectedNode.selected = 'selected';
                                //console.log ( " Selected task '" + JSON.stringify( selectedNode ) + "'");
    							//set currentNode
    							scope[treeId].currentNode = selectedNode;
                                scope.setEditedTask( selectedNode );
    						};
    					}

    					//Rendering template.
    					element.html('').append( $compile( template )( scope ) );
    				}
    			}
    		};
});
