(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5357"],{9406:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],ref:"mTable",staticStyle:{width:"100%"},attrs:{border:"",data:t.tableData,"tooltip-effect":"dark",size:"small","default-sort":{prop:t.sortField,order:t.sortDirection}},on:{"selection-change":t.handleSelectionChange,"sort-change":t.handleSortChange}},[a("el-table-column",{attrs:{type:"selection","min-width":"55"}}),a("el-table-column",{attrs:{label:"索引",type:"index","min-width":"55"}}),a("el-table-column",{attrs:{label:"日期","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.date))]}}])}),a("el-table-column",{attrs:{prop:"code",label:"代码","min-width":"100","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"title",label:"名称","min-width":"120"}}),a("el-table-column",{attrs:{prop:"day_grow",label:"日涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"week_grow",label:"周涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"month_grow",label:"月涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"three_month_grow",label:"3月涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"six_month_grow",label:"6月涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"year_grow",label:"年涨幅",sortable:"custom","min-width":"100"}}),a("el-table-column",{attrs:{prop:"two_year_grow",label:"2年涨幅",sortable:"custom","min-width":"100"}})],1),a("el-pagination",{staticClass:"ui-t-right mt-16",attrs:{small:"",layout:"total, sizes, prev, pager, next","page-sizes":[15,20,50,100],"page-size":t.pageSize,"current-page":t.pageIndex,total:t.count,background:""},on:{"current-change":t.onCurrentChange,"size-change":t.handleSizeChange}})],1)},n=[],o=(a("4160"),a("d3b7"),a("159b"),a("b32d")),i={data:function(){return{tableData:[],tableLoading:!1,mSelection:[],pageIndex:1,pageSize:15,count:0,sortField:"day_grow",sortDirection:"descending"}},created:function(){this.getTableData()},methods:{getTableData:function(){var t=this;this.tableLoading=!0,Object(o["b"])({url:"/fund",query:{pageSize:this.pageSize,pageIndex:this.pageIndex,sortField:this.sortField,sortDirection:"descending"===this.sortDirection?"DESC":"ASC"}}).then((function(e){t.count=e.data.count,t.tableData=e.data.list})).finally((function(){t.tableLoading=!1}))},toggleSelection:function(t){var e=this;t?t.forEach((function(t){e.$refs.mTable.toggleRowSelection(t)})):this.$refs.mTable.clearSelection()},handleSortChange:function(t){this.sortField=t.prop,this.sortDirection=t.order||"",this.getTableData()},handleSelectionChange:function(t){this.mSelection=t},onCurrentChange:function(t){this.pageIndex=t,this.getTableData()},handleSizeChange:function(t){this.pageIndex=1,this.pageSize=t,this.getTableData()}}},r=i,s=a("2877"),c=Object(s["a"])(r,l,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0e5357.a837b93e.js.map