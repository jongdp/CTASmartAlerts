# CTA Smart Alerts

Email alerts for Chicago buses and trains. The service watches live CTA predictions and emails you when it's time to leave.

> **Status: rebuild in progress.** The original version was a final project at Northwestern and ran on AWS (Elastic Beanstalk and Lambda) in March 2026. After losing access to that AWS account, I'm rebuilding it from scratch, one working stage at a time. The [checklist below](#status) shows what runs in this repo today.

## What it does
 
These features existed in the original version and are being rebuilt here:
 
- **No duplicate alerts.** Vehicle-ID deduplication plus a cooldown window keep the same bus from alerting you on every polling cycle.
- **Noise-tolerant firing.** An alert fires only after two consecutive readings under your threshold, or three when the predictions are jumping around.
- **Batched upstream calls.** Rules are grouped by route, stop, and direction, so calls to the CTA API grow with the number of stops watched rather than the number of rules.
- **Audit trail.** Every fired alert is recorded, and raw predictions are saved to S3 for later review.

## Status
 
- [x] Server boots with a health check
- [x] `GET /arrivals` returns live bus predictions through a shared CTA client
- [ ] Train predictions
- [ ] DynamoDB tables and provisioning script
- [ ] Alert endpoints: create, list, update, delete
- [ ] Notification history endpoint
- [ ] Polling Lambda with alert evaluation
- [ ] Email delivery (SNS) and S3 snapshots
- [ ] Tests for the alert evaluation logic
- [ ] Deployment scripts