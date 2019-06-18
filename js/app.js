(function ($) {

    $(function () {


        var addFormGroup = function (event) {
            event.preventDefault();

            var $inputGroup = $(this).parent().parent('.input-group');
            var $dataType = $inputGroup.find('select#dataType');
            var $dataSize = $inputGroup.find('input#dataSize');
            var $dataFixedOpt = $inputGroup.find('input#fixedOption');
            var $dataName = $inputGroup.find('input#dataName');
            var $dataFormat = $inputGroup.find('select#dataFormat');
            
            var format = '';
            
            if ($dataFixedOpt.val() != '' ){
                format = $dataFixedOpt.val();
            }else{
                format = $dataFormat.val();
            }
            
            if(!formValidate($dataType.val(), $dataSize.val(), $dataName.val(), format)){
                return;
            }                

            //doTheHardWork
            appendToTable($dataType.val(), $dataSize.val(), $dataName.val(), format);
            resetForm($inputGroup);
            
            
        };
        
        var formValidate = function(dataType, dataSize, dataName, format){
            var errorCod = true;            
            
            if(dataType == "fixed" && format == "format1"){
                alert('Entre com um valor fixo');
                return false;                
            }            
            
            return errorCod;
            
        }
        
        var resetForm = function (inputGroup){
            var $dataType = inputGroup.find('select#dataType');
            var $dataSize = inputGroup.find('input#dataSize');
            var $dataFixedOpt = inputGroup.find('input#fixedOption');
            var $dataName = inputGroup.find('input#dataName');
            var $dataFormat = inputGroup.find('select#dataFormat');
              //resetForm
            $dataType.val('');
            $dataSize.val('0');
            $dataName.val('');
            $dataFormat.val('format1').parent().hide();
            $dataFixedOpt.val('').parent().hide();
            
            $dataSize.prop('disabled', false).parent().show();
        }
        
        
        var customDataSets = function (event) {

            var value = $(this).val();

            switch (value) {
                case 'char':
                    $("#dataSize").prop('disabled', true).val('1');
                    $("#dataFormat").prop('disabled', false).parent().hide();
                    break;
                case 'loremipsum':
                case 'text':
                    $("#dataSize").prop('disabled', false).val('0');
                    $("#dataFormat").prop('disabled', false).parent().hide();
                    break;
                case 'date':
                    $("#dataSize").prop('disabled', true).val('0');
                    $("#dataFormat").prop('disabled', false).parent().show();
                    break;
                case 'integer':
                    $("#dataSize").prop('disabled', false).val('0');
                    $("#dataFormat").prop('disabled', false).parent().hide();
                    break;
                case 'fixed':
                    $("#fixedOption").prop('placeholder', 'Entre com um valor fixo.').parent().show();
                    $("#dataSize").prop('disabled', false).parent().hide();                 
                    break;
                case 'fixVariable':
                    $("#fixedOption").prop('placeholder', 'Entre com valores separado por (,) ABC,BCD,CDB, DCS').parent().show();
                    $("#dataSize").prop('disabled', false).parent().hide();                   
                    break;
                default:
                    $("#dataSize").prop('disabled', true).val('0');
                    $("#dataFormat").prop('disabled', false).parent().hide();
                    break;
            }

        };
        var generateData = function (event) {
            event.preventDefault();


            var table = $('.table-generate');
            var dataCols = table.find('thead tr th');

            var colsLenght = dataCols.length;
            var numLinhas = parseInt($('#numRows').val());

            if (colsLenght <= 0) {
                alert('Não existem dados a serem gerados');
                return;
            }

            if (numLinhas <= 0) {
                alert('Numero de linhas invalidos');
                return;
            }

            table.show();
            $('code').hide();
            clearTable(true);

            for (var i = 1; i <= numLinhas; i++) {

                var $line = $('<tr>');

                $.each(dataCols, function (index, obj) {

                    var $row = $('<td>');

                    switch ($(this).data('type')) {
                        case 'char':
                            $row.text(generateChar());
                            break;
                        case 'loremipsum':
                            $row.text(generateIpsum($(this).data('size')));
                            break;
                        case 'text':
                            $row.text(generateText($(this).data('size')));
                            break;
                        case 'date':
                            $row.text(generateDate($(this).data('format')));
                            break;
                        case 'datetime':
                            $row.text(generateDateTime($(this).data('format')));
                            break;
                        case 'integer':
                            $row.text(generateInteger($(this).data('size')));
                            break;
                        case 'float':
                            $row.text(generateFloat($(this).data('size')));
                            break;
                        case 'chance':
                            $row.text(generateChance());
                            break;
                        case 'name':
                            $row.text(generateChance(1));
                            break;
                        case 'phone':
                            $row.text(generateChance(2));
                            break;
                        case 'email':
                            $row.text(generateChance(3));
                            break;
                        case 'address':
                            $row.text(generateChance(4));
                            break;
                        case 'ip':
                            $row.text(generateChance(5));
                            break;
                        case 'cidade':
                            $row.text(generateChance(6));
                            break;
                        case 'pais':
                            $row.text(generateChance(7));
                            break;
                        case 'fixed':                                                        
                            $row.text(generateFixed($(this).data('format')));
                            break;
                        case 'fixVariable':
                            $row.text(generateFixVariable($(this).data('format')));
                            break;
                        default:
                            $row.text(generateChance());
                            break;
                    }
                    $row.appendTo($line);
                });

                table.find('tbody').append($line);
            }
        };
        
        
        /*
         * 
         *#########################################################################
         *      GENERATION METHODS GROUP
         *#########################################################################
         *
         *  */
        
        var generateIpsum = function (value){            
            return digiIpsum(value);            
        }
        
        var generateFixVariable = function (fixedFormat){
            
            var splited = fixedFormat.split(',');
            
            if( splited.length > 0){
               console.log(splited.length); 
               maxRamd =  parseInt(_.random(0, splited.length -1));
                
              return splited[maxRamd];                
            }            
            
            return fixedFormat;
        }
        var generateFixed = function(fixed){
               
            return fixed;        
        };
        
        var generateChar = function () {
            var charList = _.union(range('a', 'z'), range('A', 'Z'));
            var numberList = range(0, 9);

            var fullList = _.union(charList, numberList);
            //ignoro o size pois char é 1 caracter só.

            return fullList[_.random(0, fullList.length - 1)];

        };
        var generateText = function (dataSize) {
            var charList = _.union(range('a', 'z'), range('A', 'Z'));
            var textConcat = "";


            for (var i = 0; i <= dataSize; i++) {
                textConcat += charList[_.random(0, charList.length)];
            }

            return textConcat;

        };
        var generateDate = function (dataFormat) {

            var $date = new Date();
            $default = $date.toISOString().match(/(\d{4}-\d{2}-\d{2})/g);
            var ret = '';

            switch (dataFormat) {
                case 'format1':
                    ret = $default[0];
                    break;
                case 'format2':
                    ret = $default[0];
                    break;
                case 'format3':
                    ret = $date.toLocaleDateString();
                    break;
            }

            return ret;
        };
        var generateDateTime = function (dataSize, dataFormat) {
            var $date = new Date();
            return $date.toLocaleString();
        };
        var generateInteger = function (dataSize) {
            return  parseInt(_.random(0, dataSize));

        };
        var generateFloat = function (dataSize) {
            return (Math.random() * 100).toFixed(2);
        };

        var generateChance = function (rdm) {

            rdm = (typeof rdm !== 'undefined') ? rdm : _.random(1, 4);

            var ret = "";

            switch (rdm) {
                case 1:
                    ret = chance.name();
                    break;
                case 2:
                    ret = chance.phone();
                    break;
                case 3:
                    ret = chance.email();
                    break;
                case 4:
                    ret = chance.address();
                    break;
                case 5:
                    ret = chance.ip();
                    break;
                case 6:
                    ret = chance.city();
                    break;
                case 7:
                    ret = chance.country({ full: true });
                    break;
                default:
                    ret = chance.city();
                    break;
            }

            return ret;

        };
        
        /*
         * #######################################################################
         */

        var appendToTable = function (dataType, dataSize, dataName, format) {

            var table = $('.table-generate');

            if (dataType == '') {
                alert('Erro, tipo de dado nao informado');
                return;
            } else if (parseInt(dataSize.trim()) < 0 || dataSize.trim() == "") {
                alert('Data Size invalido');
                return;
            }

            dataSize = parseInt(dataSize);

            if (dataSize == 0) {
                txtDataSize = '';
            } else {
                txtDataSize = '(' + dataSize.toString() + ')';
            }

            if (dataName == '' || dataName == 'NaN') {
                dataName = dataType + txtDataSize;
            } else {
                dataName = dataName + txtDataSize;
            }

            var title = $('<th></th>')
                    .attr('data-type', dataType)
                    .attr('data-size', dataSize.toString())
                    .attr('data-format', format)
                    .text(dataName);

            table.find('thead tr').append(title);

        };

        var clearTable = function (clearHeader) {
            event.preventDefault();
            clearHeader = (typeof clearHeader !== 'undefined') ? clearHeader : false;

            var table = $('.table-generate');

            if (!clearHeader) {
                table.find('thead tr').html('');
            }

            table.find('tbody').html('');

        };

        var exportData = function () {
            var delimiter = $("#delimitador").val();
            var table = $('.table-generate');
            var trs = table.find('tbody tr');
            var $line = "";

            $('.table-generate').hide(400);

            $.each(trs, function (i, tr) {

                var length = $(tr).find('td').length;

                $.each($(tr).find('td'), function (ii, td) {
              
                    if (ii === (length - 1)) {
                        $line = $line.trim() +  $(td).text().trim();
                    } else {
                        $line = $line.trim() + $(td).text().trim() + delimiter;
                    }

                });

                $line += '<br>';

            });

            $('code').html($line);
            $('code').show(300);

        };

        $(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-gerar', generateData);
        $(document).on('change', '#dataType', customDataSets);
        $(document).on('click', '.btn-clear-table', clearTable);
        $(document).on('click', '.btn-export', exportData);
    });

})(jQuery);