/**
 * medloader - openup.org.za
 */

var timer,
    delay = 500,
    animate_speed = 750;
var search_url = function(term) { return 'https://mpr.code4sa.org/api/v2/search-lite?q=' + term; }
var related_url = function(id) { return 'https://mpr.code4sa.org/api/v2/related?nappi=' + id };
var product_detail_url = function(id) { return 'https://mpr.code4sa.org/api/v2/detail?nappi=' + id };


var map = {
    0 : 'sep',
    1 : 'cost_per_unit',
    2 : 'dispensing_fee',
    3 : 'schedule',
    4 : 'dosage_form',
    5 : 'pack_size',
    6 : 'num_packs',
    7 : 'is_generic',
};

var load_data = function(url, foo) {
    on_loading();
    return $.getJSON(url, function(data) {
        on_loaded(data);
        foo(data);
    });
}


Product = function(data, block) { 
    this.data = data;
    this.block = block;
}

Product.prototype = {

    set_name : function() {
        $('.cc-listing-name', this.block).html(this.data.name).attr('href', '#product-detail-' + this.data.nappi_code);
    },

    set_collapsible : function() {
        $('.show-more', this.block).attr('href', '#product-detail-' + this.data.nappi_code);
    },

    set_price : function() {
        $('.listing-price', this.block).html(this.data.sep);
    },

    set_class_names : function() {
        // We can't assume all data returned is of type: string :(
        if (typeof this.data.is_generic == 'string') {
            var classNameGeneric = 'type_' + this.data.is_generic.toLowerCase();
            $(this.block).addClass(classNameGeneric);
        }
        if (typeof this.data.dosage_form == 'string') {
            var classNameDosageForm = 'df_' + this.data.dosage_form.toLowerCase().replace(' ', '_');
            $(this.block).addClass(classNameDosageForm);
        }
    },

    set_related_link : function() {
        related_link = $('.find-generic a', $(this.block));
        related_link.attr('href', '#related:' + this.data.nappi_code);
    },

    build_product : function() {
        this.set_name();
        this.set_price();
        this.set_collapsible();
        this.set_class_names();
        this.set_related_link();

        return this.block;
    }
}

var on_loading = function() {
    $('#search-results').addClass('js-loading');
}

var on_loaded = function(result) {
    $('#search-results').removeClass('js-loading');
}


var $templateDetail = $('.products .template-panel-body');
var add_product_detail = function(elem) {
    var target_id = elem.attr('href').split('#product-detail-')[1];

    console.log(707077, product_detail_url(target_id))

    load_data(product_detail_url(target_id), function(data) {
        // Switch off any further event bindings to the source anchor, so that we don't get two results
        elem.off();
        console.log(data)

        // Set up the template
        var $product_detail = $templateDetail.clone().removeClass('template-panel-body');

        // Add product detail
        $('.details dd', $product_detail).each(function(idx) {
            var key = map[idx];
            if (key == "cost_per_unit") {
                val = data[key] + " / " + data["dosage_form"]
            } else {
                val = data[key]
            }
            $(this).html(val)
        });

        // Add ingredients
        var $ingredientsList = $('.ingredients dl', $product_detail);
        var productIngredients = data.ingredients;
        var productIngredientsLength = productIngredients.length;
        for (var j = 0; j < productIngredientsLength; j++) {
            $ingredientsList.append('<dt>' + productIngredients[j].name.trim() + ':</dt>');
            $ingredientsList.append('<dd>' + productIngredients[j].strength + productIngredients[j].unit + '</dd>');
        }

        // Add meta data
        $('.product-reg-number', $product_detail).html(data.regno);

        if (data.insert_url == undefined) {
            $('.package-insert', $product_detail).remove()
        } else {
            $('.product-package-insert', $product_detail).html(data.insert_url);
            $('.product-package-insert', $product_detail)[0]["href"] = data.insert_url;
        }

        // Add product-detail ID so that we have something to target with collapse()
        console.log(data)
        $product_detail.attr('id', 'product-detail-' + data.nappi_code);
        
        // Append the detail to the product in question
        elem.parents('.product').append($product_detail);

        // Add collapse toggle to the source anchor
        elem.on('click', function() {
            $('.listing-accordion-content').attr('style', 'display');
            var w = $('.listing-accordion-content').attr('style', 'display');
            console.log(3030303, w)
        });
    })
    
}


$('.search-results').hide();

var process_request = function(result) {
    // $('.listing').empty();
    // $('.search-results').hide();
    // $('.search-results').empty();

    if (result.length) {
        $('.search-results').show();
        // $('.listing').html(result.length);
        console.log(111, result)
        console.log(222, result.length)
        
        var $templateRow = $('.listing');
        
        for(var i = 0; i < result.length; i++) {
            // console.log(333, result[i])
            var $product = new Product(result[i], $templateRow.clone());
            console.log(444, $templateRow.clone())
            $('.search-results').append($product.build_product());
        }
        
        $('.show-more').on('click', function(e) {
            e.preventDefault();
            add_product_detail($(this));
        });
    } else {
        $('#noresults').show();
    }
    on_loaded(result);
}



var entermedicine = function(e) {
    searchTerm = e.target.value;
    if (searchTerm.length < 4) return;

    var load_data = function() {
        location.hash = 'search:' + searchTerm;
    }

    var reset_delay_before_requesting = function() {
        clearTimeout(timer);
        timer = setTimeout(load_data, delay);
    }

    reset_delay_before_requesting();
};

var load_medicines = function(value) {
    if (value.indexOf(':') >= 0) {
        var s = value.split(':')
        var key = s[0]
        var value = s[1]

        if (key == '#related') {
            load_data(related_url(value), process_request);
        } else if (key == '#search') {
            load_data(search_url(value), process_request);
        }
    }
}
