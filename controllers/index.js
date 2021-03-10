import Card from "../models/card.js";
import User from "../models/user.js";

export function getOverviewPage(req, res, next) {
  Promise.all([
    User.findById("603b66fb323cbf5993e9e24c"),
    Card.find().populate('owner').populate('likes')])
    .then(([profile, cards]) => {
        res.render("index.html", {profile: profile, cards: cards})
      }
    )
}

export function getChangeProfile(req, res, next) {
    User.findById("603b66fb323cbf5993e9e24c")
      .then((profile) => {
        res.render("changeProfile.html", {profile: profile})
      }
    )
}

export function getChangeAvatar(req, res, next) {
  User.findById("603b66fb323cbf5993e9e24c")
    .then((profile) => {
        res.render("changeAvatar.html", {profile: profile})
      }
    )
}


