SS = window.SS || {};

SS.template = (function() {
    'use strict';   

//    // Updates dates for drop-down selectors
//    var _tplSelectList = _.template(
//                '<option value="<%= value %>">' +
//                  '<%= label %>' +
//                '</option>'
//    );
//    
//    // Updates expense detail in Actual and Budget pages
//    var _tplDetail = _.template(
//                '<tr>' +
//                  '<td></td>' +
//                  '<td><%= date %></td>' +
//                  '<td><%= amt %></td>' +
//                  '<td><%= detail %></td>' +
//                '</tr>'
//    );
//  
//    // Updates expense subtotals in Actual and Budget pages
//    var _tplSubCat = _.template(
//                    '<li  id="<%= code %>">' + 
//                      '<a href="#">' + 
//                        '<table>' + 
//                          '<tbody class="subcat">' + 
//                            '<tr>' + 
//                              '<td>' + 
//                                '<span class= "pointRight">' +
//                                  '<i class="fa fa-chevron-right"></i>' + 
//                                '</span>' + 
//                                '<span class= "pointDown hide">' +
//                                  '<i class="fa fa-chevron-down"></i>' +
//                                '</span>' +
//                                '<%= name %>' + 
//                              '</td>' +
//                              '<td></td>' + 
//                              '<td>' +
//                                '<%= amt %>' +
//                              '</td>' +
//                              '<td></td>' +
//                            '</tr>' +
//                          '</tbody>' +
//                        '</table>' +
//                      '</a>'
//);

  
    var publicAPI = {
            
//        // Fills detail in Budget and Actual pages
//        getDetailHTML: function(data, dtype) {
//          console.log('in getDetailHTML and ' + dtype + ' data is: ');
//          console.log(data);
//            var detailHTML = '';
//
//            /*
//             * Notes on data storage:
//             * Data entry triggers change to db
//             * php then returns new data object for actual or budget data,
//             * (whichever was changed)
//             * Saves it to model.act or model.bud objects
//             * Use cur sel date and UPDATE subtotals to reflect db change
//             * Refresh view based on new subtotals
//            */
//          
//            for (var i = 0, l = data.sub.length; i < l; i++) {
//              var m = data.sub[i].detail.length;
//
//              // Show total for a sub-category
//              detailHTML += _tplSubCat({code: dtype + '_' + data.sub[i].code, name: data.sub[i].name, amt: data.sub[i].amt.toLocaleString()});
//              detailHTML += '<table class="detail hide"><tbody>';
//              
//              // Get detail for sub-category, if it exists
//              if (m > 0) {
//                for (var j = 0; j < m; j++) {
//                  data.sub[i].detail[j].amt =             
//                        parseFloat(data.sub[i].detail[j].amt).toFixed(2).toLocaleString();
//                  detailHTML += _tplDetail(data.sub[i].detail[j]);
//                }
//                
//              // Add note if no detail entered yet
//              } else {
//                detailHTML += '<tr>' +
//                                '<td></td>' +
//                                '<td>no entries</td>' +
//                                '<td></td>' +
//                                '<td></td>' +
//                              '</tr>';
//              }
//              detailHTML += '</tbody></table></li>';
//            }
//            return detailHTML;            
//        },
//            
//        // Fills dates in date selectors
//        getDatesHTML: function(data) {
//            var datesHTML = '';
//          
//            for (var i = 0, l = data.length; i < l; i++) {
//
//              // Get html for date drop down
//              datesHTML += _tplSelectList({value: data[i].code, label: data[i].name});
//            }
//            return datesHTML;            
//        },
//      
//        // Fills subcategory list with sub-categories for current category
//        getSubCatHTML: function(data) {
//            var subCatsHTML = '';
//          
//            for (var i = 0, l = data.length; i < l; i++) {
//
//              // Get html for sub-category drop down
//              subCatsHTML += _tplSelectList({value: data[i].code, label: data[i].name});
//            }
//            return subCatsHTML;            
//        }   
    };

    return publicAPI;
})();
