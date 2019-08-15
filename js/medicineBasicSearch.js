$( "#medicine-search" ).keyup(function() {
  let content = this.value;
  if (!content || content.length < 4) {
    return null;
  }

  return fetchBasicSearch(content);
});

function fetchBasicSearch(content) {
  $.get(`https://mpr.code4sa.org/api/v2/search?q=${content}`, function(data) {
    const results = _.uniqBy(data, 'nappi_code');
    $.each(results, function(index, result) {
      console.log(result)
      $('.results-wrapper').append(`
      <div class="listing">
      <div class="plate cc-listing">
        <div data-w-id="ec271bae-6f5a-43e4-d7cc-1bd69de5618c" style="border-color:rgb(255,255,255)" class="listing-accordion-trigger">
          <div class="listing-title-wrapper">
            <div class="listing-icon-wrapper"><img src="images/capsule.svg" height="24" width="24" alt="" class="listing-icon"></div>
            <div class="listing-name-wrapper">
              <h3 class="smaller-heading cc-listing-name">${result.name}</h3>
              <div class="listing-name-details">10 CAPSULES / 500 MG</div>
            </div>
          </div>
          <div class="listing-info-wrapper"><a href="generics.html" target="_blank" class="generics-link">12 Generics</a>
            <div class="listing-price"><span class="text-span">R24.12</span><span class="text-span-2"> - </span><span class="high">R35.63</span></div>
          </div>
          <div class="show-more"><img src="images/baseline-expand_more-24px.svg" style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0DEG) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0DEG) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0DEG) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0DEG) skew(0, 0)" alt="" class="show-more-icon"></div>
        </div>
        <div style="display:none" class="listing-accordion-content">
          <div class="accordion-content-wrapper">
            <div class="listing-columns-wrapper">
              <div class="listing-column cc-50 cc-mobile-full-width">
                <h4 class="listing-heading">PRODUCT DETAILS</h4>
                <div class="listing-row-wrapper">
                  <div class="row-title">Medicine Single Exit Price:</div>
                  <div class="row-value">R502.16</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Max dispensing fee:</div>
                  <div class="row-value">R177.47</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Cost per Capsule:</div>
                  <div class="row-value">R8.37 - R11.53</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Schedule:</div>
                  <div class="row-value">S3</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Dosage Form:</div>
                  <div class="row-value">Capsule</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Tablets/Doses:</div>
                  <div class="row-value">60</div>
                </div>
                <div class="listing-row-wrapper">
                  <div class="row-title">Number of packs:</div>
                  <div class="row-value">1</div>
                </div>
                <div class="listing-row-wrapper last">
                  <div class="row-title">generic/innovator:</div>
                  <div class="row-value">Originator</div>
                </div>
              </div>
              <div class="listing-column cc-50 cc-mobile-full-width">
                <h4 class="listing-heading">ingredients</h4>
                <div class="listing-row-wrapper">
                  <div class="row-title">Aspirin</div>
                  <div class="row-value">25mg</div>
                </div>
                <div class="listing-row-wrapper last">
                  <div class="row-title"><strong>Dipyridamole:</strong><br></div>
                  <div class="row-value">200mg</div>
                </div>
              </div>
            </div>
            <div class="listing-details-wrapper">
              <div class="listing-details">Registration Number: 31/8/0641</div>
              <div class="listing-details-sharing-wrapper"><a href="#" class="link-block-2 w-inline-block"><img src="images/baseline-share-24px.svg" width="24" height="24" alt=""></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
      `)
      // $('.cc-listing-name').html(result.name);
    })
  })
}

