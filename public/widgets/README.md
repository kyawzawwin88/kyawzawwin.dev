# Self-Destruction Countdown Widget

An embeddable JavaScript widget that displays a countdown timer for container self-destruction.

## Usage

### Basic Usage

Add the script tag to your HTML page:

```html
<script src="https://your-portal-domain.com/widgets/self-destruction.js"></script>
```

The widget will automatically:
- Detect the current page URL
- Fetch self-destruction countdown from the portal API
- Display a countdown timer in the top-left corner
- Update every second

### Custom Configuration

You can customize the widget by setting configuration before loading the script:

```html
<script>
  window.SelfDestructionWidget = {
    apiUrl: 'https://your-portal-domain.com/api/self-destruction',
    position: 'top-right', // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  };
</script>
<script src="https://your-portal-domain.com/widgets/self-destruction.js"></script>
```

### Configuration Options

- **apiUrl** (string, optional): Custom API endpoint URL. Defaults to `/api/self-destruction`
- **position** (string, optional): Widget position. Options: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`. Defaults to `'top-left'`

### API

The widget exposes a global API object for manual control:

```javascript
// Refresh the countdown
window.SelfDestructionWidgetAPI.refresh();

// Remove the widget
window.SelfDestructionWidgetAPI.destroy();
```

## How It Works

1. The widget automatically initializes when the script is loaded
2. It sends a GET request to the portal API with the current page URL as the Referer header
3. The API identifies the project based on the Referer URL
4. The widget displays the remaining seconds until self-destruction
5. The countdown updates every second

## Styling

The widget uses inline styles and is positioned as a fixed element. It has:
- Yellow background (`#eab308`) for normal countdown
- Red background (`#dc2626`) when countdown reaches zero
- Shadow and rounded corners for visibility
- High z-index (9999) to appear above other content

## Requirements

- The portal API endpoint must be accessible from the embedding page
- The Referer header must match a project URL in the portal database
- The project must have a `railway_service_id` configured

