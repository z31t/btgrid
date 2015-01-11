CKEDITOR.plugins.add('btgrid', {
  lang: 'en',
  requires: 'widget,dialog',
  icons: 'btgrid',
  init: function(editor) {
    var maxGridColumns = 12;
    CKEDITOR.dialog.add('btgrid', this.path + 'dialogs/btgrid.js');
    editor.addContentsCss( this.path + 'styles/editor.css');
    editor.widgets.add('btgrid', {
      allowedContent:
              'div(!btgrid);' +
              'div(!btgrid-content);',
      requiredContent: 'div(btgrid),div(row),div(content)',
      parts: {
        btgrid: 'div.btgrid',
      },
      editables: {
        content: '',
      },
      template:
              '<div class="btgrid">' +
              '</div>',
      button: 'Create a Bootstrap grid',
      dialog: 'btgrid',
      upcast: function(element) {
        return element.name == 'div' && element.hasClass('btgrid');
      },
      init: function() {
        var rowCount = this.element.getChildCount();
        for (var rowNumber= 1;rowNumber <= rowCount;rowNumber++) {
          this.createEditable(maxGridColumns, rowNumber);
        }
      },
      data: function() {
        if (this.data.colCount) {
          var colCount = this.data.colCount;
          var rowCount = this.data.rowCount;
          var row = this.parts['btgrid'];
          for (var i= 1;i <= rowCount;i++) {
            this.createGrid(colCount, row, i);
          }
        }
      },
      createGrid: function(colCount, row, rowNumber) {
        var content = '<div class="row row-' + rowNumber + '">';
        for (var i = 1; i <= colCount; i++) {
          content = content + '<div class="col-md-' + maxGridColumns/colCount + '">' +
                              '  <div class="content">' +
                              '    <p>Col ' + i + ' content area</p>' +
                              '  </div>' +
                              '</div>';
        }
        content =content + '</div>';
        row.appendHtml(content);
        this.createEditable(colCount, rowNumber);
      },
      createEditable: function(colCount,rowNumber) {
        for (var i = 1; i <= colCount; i++) {
          this.initEditable( 'content'+ rowNumber + i, {
            selector: '.row-'+ rowNumber +' > div:nth-child('+ i +') div.content'
          } );
        }
      }
    });
  }
});
