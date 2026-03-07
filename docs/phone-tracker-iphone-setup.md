# Phone Tracker Agent (iPhone 16 Pro Max) — Quick Start

## 1) Add secret token in `.env.local`

```env
PHONE_TRACKER_TOKEN=replace_with_long_random_secret
```

## 2) API endpoint

- Update location: `POST /api/phone-tracker`
- Read latest: `GET /api/phone-tracker?deviceId=iphone-16-pro-max`

Auth header required on both:

- `x-device-token: <PHONE_TRACKER_TOKEN>`

## 3) iPhone Shortcut (no App Store build needed to start)

Create a Shortcut named **MissionControl Location Ping**:

1. Action: **Get Current Location**
2. Action: **Get Contents of URL**
   - URL: `https://<your-mission-control-domain>/api/phone-tracker`
   - Method: `POST`
   - Headers:
     - `x-device-token: <same token>`
     - `Content-Type: application/json`
   - Request Body (JSON):

```json
{
  "deviceId": "iphone-16-pro-max",
  "name": "Myrie iPhone 16 Pro Max",
  "lat": <Latitude>,
  "lon": <Longitude>,
  "timestamp": "<Current Date>"
}
```

3. Save and run manually first.

## 4) Automation options

- Trigger on open/close selected apps
- Trigger on focus mode changes
- Trigger at time intervals (battery-sensitive)

## 5) Next upgrade (recommended)

- Build native iOS app (React Native) with:
  - background location updates
  - geofence alerts
  - low-battery alerts
  - encrypted keychain token
