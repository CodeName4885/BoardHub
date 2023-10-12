import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function GameDetailPage() {


  return (
    <section class="page-section review-page spad">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="review-item">
						<div class="review-cover set-bg" data-setbg="img/review/5.jpg">
							<div class="score yellow">9.3</div>
						</div>
						<div class="review-text">
							<h4>Overwatch Halloween</h4>
							<div class="rating">
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star is-fade"></i>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame. Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="text-center pt-4">
				<button class="site-btn btn-sm">Load More</button>
			</div>
		</div>
	</section>
  );
}
