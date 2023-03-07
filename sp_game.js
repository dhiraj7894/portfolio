var adSpot = "JGJPGameEonninja";
var adSpotRewarded = "JGJPRVGameEonninja";
var isReady = false;
var isReadyRewarded = false;
var rewardGranted = false;

var config = {'autoControl': ['volume', 'exit'], 'gameName': 'gamename', 'gameVersion': 'V1.0.2'};
var gameSDK;

window.addEventListener('DOMContentLoaded', function() {
    gameSDK = new Jiogames(config);

    JioAds.onAdPrepared = function(AdPlacementId) {
        AdPlacementId == adSpot && (isReady = true, console.log("onAdReady Interstitial " + isReady));
        AdPlacementId == adSpotRewarded && (isReadyRewarded = true, console.log("onAdReady RewardedVideo " + isReadyRewarded));
    }



    JioAds.onAdFailedToLoad = function(AdPlacementId, errorCode) {
        AdPlacementId == adSpot && (isReady = false, console.log("onAdFailedToLoad Interstitial " + isReady));
        AdPlacementId == adSpotRewarded && (isReadyRewarded = false, console.log("onAdError RewardedVideo " + isReadyRewarded + " errorCode " + errorCode));
    }
    JioAds.onAdClosed = function(AdPlacementId, pIsVideoCompleted, pIsEligibleForReward) {
        AdPlacementId == adSpotRewarded && (isReadyRewarded = false, console.log("onAdClose RewardedVideo " + isReadyRewarded));
        if (AdPlacementId == adSpot) {
            isReady = false;
        }
		rewardGranted = true;
    }
    JioAds.onAdMediaEnd = function(AdPlacementId, success, rewardpoints) {
        AdPlacementId == adSpotRewarded && (isReadyRewarded = false, console.log("onAdMediaEnd RewardedVideo " + isReadyRewarded + " success: " + success + " rewardPoints: " + rewardpoints));
        if(AdPlacementId == adSpotRewarded && success){
            checkAdsRewardGranted();
        }
    }
    JioAds.onAdClick = function(AdPlacementId, success) {}
    JioAds.onAdMediaStart = function(AdPlacementId, success) {}
    JioAds.onAdRefresh = function(AdPlacementId, success) {}
    JioAds.onAdSkippable = function(AdPlacementId, success) {}
});

function postScore(score) {
    console.log("Jiogames: postScore() ",score);
        gameSDK.postScore(score);
}


function cacheAdRewarded() {
    console.log("JioGames: cacheAdRewarded");
    if (!isReadyRewarded) {
        
        JioAds.cacheAd(adSpotRewarded);
    }
}

function cacheAd() {
    console.log("ioGames: cacheAd");
    if (!isReady) {
        JioAds.cacheAd(adSpot);
    }
}

function showAdRewarded() {
    console.log("JioGames: showAdRewarded adSpotRewarded");
    if (isReadyRewarded) {
        JioAds.showAd(adSpotRewarded);
    }
}

function showAd() {
    console.log("JioGames: showAd adSpot");
    if (isReady) {
        JioAds.showAd(adSpot);
    }
}

//catching ads on the start of level
function gameCacheAd(){
    cacheAd();
    console.log("cacheAds called");
    setTimeout(() => {
        cacheAdRewarded();
        console.log("cacheRewardedAds called");
    }, 5000);
}

// function gameShowRewardAd(){
//     console.log("gameShow Calling.........");
//     if(isReadyRewarded){
//         console.log("gameShowRewardAd Called");
//     }else{
//         console.log("gameShowRewardAd Faled");
//     }
// }

// function gameShowAd(){
//     console.log("gameShow 2 Calling.........");
//     if(isReady){
//         console.log("gameShowAd Called");
//     }else{
//         console.log("gameShowAd Faled");
//     }
// }


// this function will directly show ads if it loaded
// if not loaded game will continue to noRevive screen
function showAdIfLoaded(){
    if(isReady){
        showAd();
        console.log("Ad is being Showed");
    }else{
        c2_callFunction("noRevive", []);
        console.log("Ads No ad Loaded 1");
    }
}

// Here I'm checking if reward video is loaded or not
// if RV is loaded then show revive screen else show normal ads and continue the game
function checkAdsLoaded(){
    if(isReadyRewarded){
        c2_callFunction("adRewardAds", []);
        console.log("Rewarded Video Loaded");
    }else if(isReady){
        c2_callFunction("adAds", []);
        console.log("Normal Video Loaded");
    }else{
        c2_callFunction("noRevive", []);
        console.log("Rewarded NO Video Loaded");
    }
}



// here I'm checking if reward granted or not if not granted just load main menu
function checkAdsRewardGranted(){
    if(rewardGranted){
        c2_callFunction("yesRevive",[]);
        console.log("Ads Granted");
    }else{
        c2_callFunction("menu", []);
        console.log("No reward Granted");
    }
}