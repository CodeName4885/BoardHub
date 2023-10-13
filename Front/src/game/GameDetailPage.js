import React, { useState } from "react";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function GameDetailPage() {


  return (
    <section className="page-section review-page spad">
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="review-item">
						<div className="review-cover set-bg" data-setbg="img/review/5.jpg">
							<div className="score yellow">9.3</div>
						</div>
						<div className="review-text">
							<h4>Overwatch Halloween</h4>
							<div className="rating">
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star is-fade"></i>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame. Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center pt-4">
				<button className="site-btn btn-sm">Load More</button>
			</div>
		</div>
	</section>
  );
}
