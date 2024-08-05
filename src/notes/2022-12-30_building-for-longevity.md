---
title: "Building for longevity"
tags: ["software", "programming"]
layout: "note.tsx"
---

I spend an inordinate amount of time thinking about what languages and tools to work with. There are so many objective tradeoffs to consider, and some not insignificant portion of the decision that falls to personal preference, which I have an unusually hard time sorting out.

One thing I know for certain though -- **software has a maintenance burden**. It's all too often that this burden is not properly considered when making technical choices. But it is incredibly important to consider! Time is precious, so knowing the required ongoing time investment to keep a system or project alive is crucial.

What sort of capacity will you (or whoever is going to be responsible for this piece of software long term) have to keep it running and doing its job? How much effort will be required to accomplish that in the first place? Are you using dependencies that update often? What is the long term support story for those tools?

What about the language itself, will it be able to compile without modification long into the future? What about the infrastructure? Are you going to be responsible for OS-level security patching? If you're using some managed service, are their offerings or APIs going to change, or do they build on widely adopted standards?

There's a long list of qualities you could consider, but each piece of it has some sort of potential maintenance burden. If you're building at a company that can support this maintenance burden, and then benefits you get from the stack choices you make outweigh this long-term maintenance, then by all means, go right ahead!

Personally, I'm always feeling a little time-poor, so having the peace of mind that I can build and run something that will require absolutely minimal maintenance and continue building and running well into the future is high on my list of things that influence my technical decision-making.

I'm reminded a a Freakonomics podcast episode titled [In Praise of Maintenance](https://freakonomics.com/podcast/in-praise-of-maintenance/) which talks about the importance of maintenance for a well-functioning society, and our current obsession with innovation. Yes, new ideas are important, but so is sustainability! I'd say society is tipping pretty strongly towards innovation at this time, so let's all do a bit to nudge things back in the other direction.

As the saying goes, [choosing boring, stable technology](https://boringtechnology.club) has major benefits! Longevity is a benefit more consequential than we may often give it credit for. Think about the maintenance required for the things you put out into the world, and choose tools and techniques that will minimize that burden.

Your future self, and anyone else that must work on that software, will thank you.

