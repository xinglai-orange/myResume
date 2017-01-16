$(document).ready(function(){
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        'sectionsColor': ['#fff', '#60BFBF', '#99D9EA', '#695684'],
        anchors: ['aboutMe', 'experience', 'technical', 'information'],
        'navigation': false,
        'navigationPosition': 'right',
        'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
        'slidesNavigation':true,
        'menu' :"#breadcrumb",
        afterLoad:function(anchorLink,index){
            var index=index;
            var $breadcrumbs=$(".breadcrumb a");
            $breadcrumbs.eq(index-1).addClass("active").siblings().removeClass("active");
            
            
        },
        afterSlideLoad:function(anchorLink,index,slideIndex){
            if (slideIndex==2) {
                $branch=$(".cssModel .field .branch");
                $blow=$(".cssModel .field .blow");
                $leave1=$(".cssModel .field .blow .leaf:nth-child(2)");
                $leave2=$(".cssModel .field .blow .leaf:nth-child(3)");
                $leave3=$(".cssModel .field .blow .leaf:nth-child(4)");
                $leave4=$(".cssModel .field .blow .leaf:nth-child(5)");
                $branch.addClass("branchsta");
                $blow.addClass("blowsta");
                $leave1.addClass("leaf1");
                $leave2.addClass("leaf2");
                $leave3.addClass("leaf3");
                $leave4.addClass("leaf4");
            }
        }
    })
})

/**
 * 玻璃手风琴
 * @param  {[type]} ) {               $sectionLis [description]
 * @return {[type]}   [description]
 */
$(function () {
    $sectionLis=$(".accordion li");
    $role=$(".role");
    $mask=$(".tou-mask");
    $sectionLis.on("click", function () {
        $(this).animate({"width":"400px"}).siblings().animate({"width":"200px"});
        // $role.removeClass("role-active");
        $role.filter(".role-active").removeClass("role-active");
        $(this).find(".role").animate({"width":"200px"}).addClass("role-active");
        
        $mask.removeClass("tou-mask-clc").addClass("tou-mask-order");;
        $(this).find(".tou-mask").removeClass("tou-mask-order").addClass("tou-mask-clc");
    })
})