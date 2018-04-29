<template>
	<div class="homepage">
    <!-- <div> -->
		<div class="marquee" style="overflow: hidden;">
      <video :src="[video]" autoplay loop class="marquee-video"></video>
			<!-- <effect /> -->
			<div class="marquee-text">
				<h1>MO</h1>
			</div>
		</div>
		<div class="homepage-copy">
			<h1 class="first title is-1 has-text-black">
					Matt O'Tousa,
				</h1>
			<h1 class="second title is-2 has-text-black">
					Front End Developer<br/>
			</h1>
			<h1 class="homepage-link title is-5">
        OH NO A SECRET
			</h1>
		</div>
	</div>
</template>

<script>
	// import Effect from '@/components/Effect.vue'
import VideoBg from 'vue-videobg'
import video from '@/assets/343011110.mp4'

	export default {
    name: 'HomePage',
    data () {
      return {
        video
      }
    },
    mounted () {
      document.querySelector('video').playbackRate = 0.34
    },
    components: {VideoBg}
	}
	
</script>

<style>
	.marquee {
		animation-name: fade-in;
		animation-duration: 1.5s;
		/*
		width: 100%;
		height: 100vh;
		*/
		width: 100%;
		/*width: 340px;*/
		height: 290px;
		margin: auto;
		position: relative;
		background: #425c87;
		background: #c7d4e8;
		background: #496ba3;
		background: #065be2;
		background: #4370ba;
		background: white;
		background: #053684;
		background: #0a8464;
    background: rgba(0,0,0,.2);
    background: transparent;
    background: rgba(0,0,0,.4);
    background: rgba(0,0,0,.1);
    /*
    box-shadow: 0 0 100px 2000px rgba(0,0,0,1);
    box-shadow: 0 0 100px 2000px white;
    box-shadow: 0 0 100px 2000px rgba(0,0,0,.4);
    box-shadow: 0 0 100px 2000px rgba(255,255,255,.3);
    box-shadow: 0 0 100px 2000px white;
    box-shadow: 0 0 100px 2000px rgba(0,0,0,.4);
    box-shadow: 0 0 100px 2000px white;
    box-shadow: 0 0 100px 2000px rgba(255,255,255,.6);
    box-shadow: 0 0 100px 2000px rgba(0,0,0,.8);
    box-shadow: 0 0 100px 2000px white;
    */
		opacity: 1;
	}
	.homepage {
		margin: auto;
		width: 340px;
		width: 680px;
		width: 380px;
		/* width: 340px; */
		/* width: 345px; */
		position: relative;
		box-sizing: border-box;
	}
	@media (max-width: 600px) {
		.homepage {
			top: 10px;
		}
	}
	.homepage * {
		box-sizing: border-box;
	}

	.homepage-copy {
		/* for mobile gpu */
		transform: translate3d(0, 0, 0);
		padding-top: 40px;
		animation-name: fade-in;
		width: 340px;
		width: 100%;
		margin: auto;
	}

	@keyframes fade-in {
		0% {opacity: 0; transform: translateY(40px)}
		70% {transform: translateY(-5px)}
		87% {transform: translateY(2px)}
		100% {opacity: 1; transform: translateY(0)}
	}

	.marquee-text {
		/* for mobile gpu */
		transform: translate3d(0, 0, 0);
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 1000;
	}
	.marquee-text h1 {
		/* for mobile gpu */
		transform: translate3d(0, 0, 0);
		font-size: 8em;
		color: #065be2;
		color: #053684;
		color: #4370ba;
		color: rgba(black, 0.2);
		color: white;
		padding: 15px 30px;
    padding-left: 50px;
		border: 14px solid white;
		margin: 20px;
		animation-name: fade-in;
		animation-duration: 1.7s;
		animation-fill-mode: forwards;
		font-weight: bold;
	}

	.homepage-copy h1 {
		/* for mobile gpu */
		transform: translate3d(0, 0, 0);
		font-weight: normal;
		text-align: left;
		margin-top: 40px;
		margin: 0;
	}

	.first {
		opacity: 0;
		animation-name: fade-in;
		animation-delay: 0.8s;
		animation-duration: 1.5s;
		animation-fill-mode: forwards;
	}
	.second {
		opacity: 0;
		animation-name: fade-in;
		animation-delay: 1.2s;
		animation-duration: 1.5s;
		animation-fill-mode: forwards;
	}

	.homepage-copy h1.homepage-link{
		padding: 10px 20px;
    color: white;
		box-sizing: border-box;
		text-align: center;
		display: block;
		width: 60%;
		margin: 0 20%;
		text-decoration: none;
		animation-name: fade-in;
		opacity: 0;
		animation-duration: 1.8s;
		animation-delay: 1.6s;
		animation-fill-mode: forwards;
		margin-top: 40px;
	}

</style>
