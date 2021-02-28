import Card from "../models/card.js";
import User from "../models/user.js";

export function getOverviewPage(req, res, next) {
  console.log("redner, redner, redner0");
  Promise.all([
    User.findById("603b66fb323cbf5993e9e24c"),
    Card.find().populate('owner').populate('likes')])
    .then(([profile, cards]) => {
        console.log(cards);
        console.log(profile);
        res.render("index.html", {profile: profile, cards: cards})
      }
    )
}



