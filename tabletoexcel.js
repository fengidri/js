function TableToExcelUtil(tableID) {
    this.tableBorder = -1; //边框类型，-1没有边框 可取1/2/3/4
    this.backGround = 4; //背景颜色：白色 可取调色板中的颜色编号 1/2/3/4....
    this.fontColor = 1; //字体颜色：黑色
    this.fontSize = 10; //字体大小
    this.fontStyle = "宋体"; //字体类型
    this.rowHeight = 20; //行高
    this.columnWidth = -1; //列宽
    this.lineWrap = true; //是否自动换行
    this.textAlign = -4108; //内容对齐方式 默认为居中
    this.autoFit = true; //是否自适应宽度
    this.tableID = tableID;
}
TableToExcelUtil.prototype.setTableBorder = function (excelBorder) {
    this.tableBorder = excelBorder ;
};
TableToExcelUtil.prototype.setBackGround = function (excelColor) {
    this.backGround = excelColor;
};
TableToExcelUtil.prototype.setFontColor = function (excelColor) {
    this.fontColor = excelColor;
};
TableToExcelUtil.prototype.setFontSize = function (excelFontSize) {
    this.fontSize = excelFontSize;
};
TableToExcelUtil.prototype.setFontStyle = function (excelFont) {
    this.fontStyle = excelFont;
};
TableToExcelUtil.prototype.setRowHeight = function (excelRowHeight) {
    this.rowHeight = excelRowHeight;
};
TableToExcelUtil.prototype.setColumnWidth = function (excelColumnWidth) {
    this.columnWidth = excelColumnWidth;
};
TableToExcelUtil.prototype.isLineWrap = function (lineWrap) {
    if (lineWrap == false || lineWrap == true) {
        this.lineWrap = lineWrap;
    }
};
TableToExcelUtil.prototype.setTextAlign = function (textAlign) {
    this.textAlign = textAlign;
};
TableToExcelUtil.prototype.isAutoFit = function(autoFit){
    if(autoFit == true || autoFit == false)this.autoFit = autoFit ;
}
//文件转换主函数
TableToExcelUtil.prototype.getExcelFile = function () {
var jXls, myWorkbook, myWorksheet, myHTMLTableCell, myExcelCell, myExcelCell2;
var myCellColSpan, myCellRowSpan;
try {
    jXls = new ActiveXObject('Excel.Application');
}catch (e) {
    alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，"+"那么请调整IE的安全级别。\n\n具体操作：\n\n"+"工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
    return false;
}
jXls.Visible = true;
myWorkbook = jXls.Workbooks.Add();
jXls.DisplayAlerts = false;
myWorkbook.Worksheets(3).Delete();
myWorkbook.Worksheets(2).Delete();
jXls.DisplayAlerts = true;
myWorksheet = myWorkbook.ActiveSheet;
var readRow = 0, readCol = 0;var totalRow = 0, totalCol = 0;
var tabNum = 0;
//设置行高、列宽
if(this.columnWidth != -1)
    myWorksheet.Columns.ColumnWidth = this.columnWidth;
else
    myWorksheet.Columns.ColumnWidth = 7;
if(this.rowHeight != -1)
    myWorksheet.Rows.RowHeight = this.rowHeight ;
//搜索需要转换的Table对象，获取对应行、列数
var obj = document.all.tags("table");
for (x = 0; x < obj.length; x++) {
    if (obj[x].id == this.tableID) {
        tabNum = x;
        totalRow = obj[x].rows.length;
        for (i = 0; i < obj[x].rows[0].cells.length; i++) {
            myHTMLTableCell = obj[x].rows(0).cells(i);
            myCellColSpan = myHTMLTableCell.colSpan;
            totalCol = totalCol + myCellColSpan;
        }
    }
}
//开始构件模拟表格
var excelTable = new Array();
for (i = 0; i <= totalRow; i++) {
    excelTable[i] = new Array();
    for (t = 0; t <= totalCol; t++) {
        excelTable[i][t] = false;
    }
}
//开始转换表格
for (z = 0; z < obj[tabNum].rows.length; z++) {
    readRow = z + 1;
    readCol = 0;
    for (c = 0; c < obj[tabNum].rows(z).cells.length; c++) {
        myHTMLTableCell = obj[tabNum].rows(z).cells(c);
        myCellColSpan = myHTMLTableCell.colSpan;
        myCellRowSpan = myHTMLTableCell.rowSpan;
        for (y = 1; y <= totalCol; y++) {
            if (excelTable[readRow][y] == false) {
                readCol = y;
                break;
            }
        }
        if (myCellColSpan * myCellRowSpan > 1) {
            myExcelCell = myWorksheet.Cells(readRow, readCol);
            myExcelCell2 = myWorksheet.Cells(readRow + myCellRowSpan - 1, readCol + myCellColSpan - 1);
            myWorksheet.Range(myExcelCell, myExcelCell2).Merge();
            myExcelCell.HorizontalAlignment = this.textAlign;
            myExcelCell.Font.Size = this.fontSize;
            myExcelCell.Font.Name = this.fontStyle;
            myExcelCell.wrapText = this.lineWrap;
            myExcelCell.Interior.ColorIndex = this.backGround;
            myExcelCell.Font.ColorIndex = this.fontColor;
            if(this.tableBorder != -1){
                myWorksheet.Range(myExcelCell, myExcelCell2).Borders(1).Weight = this.tableBorder ;
                myWorksheet.Range(myExcelCell, myExcelCell2).Borders(2).Weight = this.tableBorder ;
                myWorksheet.Range(myExcelCell, myExcelCell2).Borders(3).Weight = this.tableBorder ;
                myWorksheet.Range(myExcelCell, myExcelCell2).Borders(4).Weight = this.tableBorder ;
            }
            myExcelCell.Value = myHTMLTableCell.innerText;
            for (row = readRow; row <= myCellRowSpan + readRow - 1; row++) {
                for (col = readCol; col <= myCellColSpan + readCol - 1; col++) {
                    excelTable[row][col] = true;
                }
            }
            readCol = readCol + myCellColSpan;
        } else {
            myExcelCell = myWorksheet.Cells(readRow, readCol);
            myExcelCell.Value = myHTMLTableCell.innerText;
            myExcelCell.HorizontalAlignment = this.textAlign;
            myExcelCell.Font.Size = this.fontSize;
            myExcelCell.Font.Name = this.fontStyle;
            myExcelCell.wrapText = this.lineWrap;
            myExcelCell.Interior.ColorIndex = this.backGround;
            myExcelCell.Font.ColorIndex = this.fontColor;
            if(this.tableBorder != -1){
                myExcelCell.Borders(1).Weight = this.tableBorder ;
                myExcelCell.Borders(2).Weight = this.tableBorder ;
                myExcelCell.Borders(3).Weight = this.tableBorder ;
                myExcelCell.Borders(4).Weight = this.tableBorder ;
            }
            excelTable[readRow][readCol] = true;readCol = readCol + 1;
        }
    }
}
if(this.autoFit == true)
    myWorksheet.Columns.AutoFit;
jXls.UserControl = true;
jXls = null;
myWorkbook = null;
myWorksheet = null;
};
function exportExcel(tid)
{
var tb = new TableToExcelUtil(tid);
tb.setFontStyle("Courier New");
tb.setFontSize(10); //推荐取值10
tb.setFontColor(6); //一般情况不用设置
tb.setBackGround(2); //一般情况不用设置
tb.setTableBorder(2); //推荐取值2
tb.setColumnWidth(10); //推荐取值10
tb.isLineWrap(false);
tb.isAutoFit(true);

tb.getExcelFile();
}
