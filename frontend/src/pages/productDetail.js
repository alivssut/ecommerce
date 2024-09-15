import React from 'react'
import Slider from '../components/slider/slider'
import RecommenderSlider from '../components/slider/recommenderSlider'
import "../assets/css/homePageStyles.css"
import RecommenderSlider2 from '../components/slider/RecommenderSlider2'
import one from '../assets/images/product-details/1.jpg'
import similar from '../assets/images/product-details/similar1.jpg'
import newImg from '../assets/images/product-details/new.jpg'
import galleryImg from '../assets/images/home/Gallery.jpg'
import shippingImg from "../assets/images/home/shipping.jpg"
import recommendImg from "../assets/images/home/Gallery.jpg"

function ProductDetail() {
  return (
        <section>
		<div class="container">
			<div class="row">
				
				<div class="col-sm-9 padding-right">
					<div class="product-details">
						<div class="col-sm-5">
							<div class="view-product">
								<img src={one} alt="" />
								<h3>بزرگنمایـی</h3>
							</div>
							<div id="similar-product" class="carousel slide" data-ride="carousel">
								
								    <div class="carousel-inner">
										<div class="item active">
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										</div>
										<div class="item">
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										</div>
										<div class="item">
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										  <a href=""><img src={similar} alt=""/></a>
										</div>
										
									</div>

								  <a class="right item-control" href="#similar-product" data-slide="next">
									<i class="fa fa-angle-right"></i>
								  </a>
								  <a class="left item-control" href="#similar-product" data-slide="prev">
									<i class="fa fa-angle-left"></i>
								  </a>
							</div>

						</div>
						<div class="col-sm-7">
							<div class="product-information">
								<img src={newImg} class="newarrival" alt="" />
								<div>
									<h2>کـالای شمـاره 010</h2>
									<p>شناسـه : 0110110</p>
								</div>
								<div>
									<span>
										<span>قیمت : 2.350.000 ريال</span>
									</span>
									<span>
										<label>تعداد :</label>
										<input type="text" value="3" class="search_box"/>
										<button type="button" class="btn btn-fefault cart">
											<i class="fa fa-shopping-cart"></i>
											افـزودن به سبـد خریـد
										</button>
									</span>
								</div>
								<div>
									<p><b>موجـودی :</b> در انبـار موجود می باشد</p>
									<p><b>شرایـط :</b> جدیـد</p>
									<p><b>برنـد :</b> برنـد </p>
								</div>
							</div>
						</div>
					</div>
					
					<div class="category-tab shop-details-tab">
						<div class="col-sm-12">
							<ul class="nav nav-tabs">
								<li><a href="#details" data-toggle="tab">جزئیات</a></li>
								<li><a href="#companyprofile" data-toggle="tab">درباره سازنده</a></li>
								<li><a href="#tag" data-toggle="tab">برچسب</a></li>
								<li class="active"><a href="#reviews" data-toggle="tab">نظرات (5)</a></li>
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane fade" id="details" >
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="tab-pane fade" id="companyprofile" >
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="tab-pane fade" id="tag" >
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-3">
									<div class="product-image-wrapper">
										<div class="single-products">
											<div class="productinfo text-center">
												<img src={galleryImg} alt="" />
												<h2>1.250.000 ريال</h2>
												<p>توضیحات کوتاه محصول</p>
												<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="tab-pane fade active in" id="reviews" >
								<div class="col-sm-12">
									<ul>
										<li><a href=""><i class="fa fa-user"></i>مشتـری 1</a></li>
										<li><a href=""><i class="fa fa-clock-o"></i>12:41 ب . ظ</a></li>
										<li><a href=""><i class="fa fa-calendar-o"></i>29 تیـر 1397</a></li>
									</ul>
									<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده ازلورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</p>
									<p><b>نظـر خود را بنویسیـد</b></p>
									
									<form action="#">
										<span>
											<input type="text" placeholder="نام و نام خانوادگـی"/>
											<input type="email" placeholder="آدرس ایمیـل"/>
										</span>
										<textarea name="" ></textarea>
										<b>رتبـه : </b> <img src="images/product-details/rating.png" alt="" />
										<button type="button" class="btn btn-default pull-left">
											ارسـال
										</button>
									</form>
								</div>
							</div>
							
						</div>
					</div>
					
					<div class="recommended_items">
						<h2 class="title text-center">محصولات پیشنهادی</h2>
						
						<div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
							<div class="carousel-inner">
								<div class="item active">	
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="item">	
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src={recommendImg} alt="" />
													<h2>1.250.000 ريال</h2>
													<p>توضیحات کوتاه محصول</p>
													<button type="button" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>افزودن به سبـد خریـد</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							 <a class="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
								<i class="fa fa-angle-left"></i>
							  </a>
							  <a class="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
								<i class="fa fa-angle-right"></i>
							  </a>			
						</div>
					</div>
					
				</div>
				
				<div class="col-sm-3">
					<div class="left-sidebar">
						<h2>دسته بندی محصولات</h2>
						<div class="panel-group category-products" id="accordian">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											دسته 1
										</a>
									</h4>
								</div>
								<div id="sportswear" class="panel-collapse collapse">
									<div class="panel-body">
										<ul>
											<li><a href="">محصول 1 </a></li>
											<li><a href="">محصول 2 </a></li>
											<li><a href="">محصول 3 </a></li>
											<li><a href="">محصول 4</a></li>
											<li><a href="">محصول 5</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#mens">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											دسته 2
										</a>
									</h4>
								</div>
								<div id="mens" class="panel-collapse collapse">
									<div class="panel-body">
										<ul>
											<li><a href="">محصول 1 </a></li>
											<li><a href="">محصول 2 </a></li>
											<li><a href="">محصول 3 </a></li>
											<li><a href="">محصول 4</a></li>
											<li><a href="">محصول 5</a></li>
										</ul>
									</div>
								</div>
							</div>
							
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 1</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 2</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 3</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 4</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 5</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 6</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">محصول 7</a></h4>
								</div>
							</div>
						</div>
					
						<div class="brands_products">
							<h2>برنـد ها</h2>
							<div class="brands-name">
								<ul class="nav nav-pills nav-stacked">
									<li><a href=""> <span class="pull-left">(50)</span>برنـد 1</a></li>
									<li><a href=""> <span class="pull-left">(56)</span>برنـد 2</a></li>
									<li><a href=""> <span class="pull-left">(27)</span>برنـد 3</a></li>
									<li><a href=""> <span class="pull-left">(32)</span>برنـد 4</a></li>
									<li><a href=""> <span class="pull-left">(5)</span>برنـد 5</a></li>
								</ul>
							</div>
						</div>
						
						<div class="price-range">
							<h2>فیلتـر قیمـت</h2>
							<div class="well">
								 <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1000000" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
								 <b>1.000.000 ريال</b> <b class="pull-left">0 ريال</b>
							</div>
						</div>
						
						<div class="shipping text-center">
							<img src={shippingImg} alt="" />
						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	</section>
  )
}

export default ProductDetail