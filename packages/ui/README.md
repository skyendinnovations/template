# @template/ui

A comprehensive UI component library built with Radix UI primitives and styled with Tailwind CSS.

## Components Included

### Core Components
- ✅ **Button** - Versatile button with multiple variants and sizes
- ✅ **Input** - Form input field with proper styling
- ✅ **Label** - Accessible form labels
- ✅ **Card** - Container component with header, content, and footer
- ✅ **Avatar** - User avatar with image and fallback support
- ✅ **Badge** - Status indicators and tags

### Form Components
- ✅ **Checkbox** - Interactive checkbox input
- ✅ **RadioGroup** - Radio button group
- ✅ **Select** - Dropdown select component
- ✅ **Switch** - Toggle switch component
- ✅ **Textarea** - Multi-line text input

### Layout & Navigation
- ✅ **Alert** - Notification and status messages
- ✅ **Dialog** - Modal dialogs and overlays
- ✅ **DropdownMenu** - Context menus and dropdowns
- ✅ **Separator** - Visual dividers
- ✅ **Tabs** - Tabbed navigation interface
- ✅ **Pagination** - Page navigation controls

### Data Display
- ✅ **Table** - Data tables with sorting and pagination support

## Installation

The UI package is designed to work within the monorepo workspace. All dependencies are installed at the root level.

```json
{
  "dependencies": {
    "@template/ui": "workspace:*"
  }
}
```

## Usage

Import components from the main package:

```typescript
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTrigger
} from "@template/ui";
```

## Component Examples

### Button
```tsx
import { Button } from "@template/ui";

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@template/ui";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogTrigger } from "@template/ui";

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <h2>Dialog Title</h2>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

### Form with Validation
```tsx
import { useForm } from "@tanstack/react-form";
import { Button, Input, Label } from "@template/ui";

const form = useForm({
  // Form configuration
});

<form.Field name="email">
  {(field) => (
    <div>
      <Label htmlFor={field.name}>Email</Label>
      <Input
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  )}
</form.Field>
```

## Styling

Components use Tailwind CSS classes and CSS variables for theming:

- **Colors**: CSS custom properties for primary, secondary, destructive, etc.
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Typography**: Proper text sizing and font weights
- **Shadows**: Subtle shadows for depth
- **Borders**: Consistent border radius and colors

## Accessibility

All components are built with accessibility in mind:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Semantic HTML structure

## Dependencies

This package uses:

- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Class Variance Authority**: Type-safe variant management
- **clsx & tailwind-merge**: Conditional className handling

## Contributing

When adding new components:

1. Use Radix UI primitives for accessibility
2. Follow the existing naming and structure patterns
3. Add TypeScript types for all props
4. Include proper documentation
5. Test accessibility features

## Multi-App Usage

This UI package is designed to be shared across multiple applications in the monorepo. Each app can import and use these components consistently while maintaining their own styling if needed.

