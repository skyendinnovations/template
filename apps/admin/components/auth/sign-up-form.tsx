"use client";

import { useForm } from "@tanstack/react-form";
import z from "zod";
import { Button, Input, Label } from "@template/ui";
import { signUpActionClient } from "@/data/auth";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Shield } from "lucide-react";

export function SignUpForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await signUpActionClient(value);

      if (result?.data?.success) {
        toast.success("Admin account created successfully!");
      } else {
        const errorMessage = result?.data?.error ||
          (typeof result?.serverError === 'object' ? result.serverError.message : result?.serverError) ||
          "Failed to sign up";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-center mb-6">
        <Shield className="h-12 w-12 text-green-600" />
      </div>

      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "Name is required"
              : value.length < 2
                ? "Name must be at least 2 characters"
                : undefined,
          onBlur: ({ value }) =>
            !value
              ? "Name is required"
              : value.length < 2
                ? "Name must be at least 2 characters"
                : undefined,
          onSubmit: ({ value }) =>
            !value
              ? "Name is required"
              : value.length < 2
                ? "Name must be at least 2 characters"
                : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Admin Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Enter your admin name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`pl-10 ${field.state.meta.errors.length > 0 ? 'border-red-500' : ''}`}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-red-600 text-sm">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "Email is required"
              : !z.string().email().safeParse(value).success
                ? "Please enter a valid email address"
                : undefined,
          onBlur: ({ value }) =>
            !value
              ? "Email is required"
              : !z.string().email().safeParse(value).success
                ? "Please enter a valid email address"
                : undefined,
          onSubmit: ({ value }) =>
            !value
              ? "Email is required"
              : !z.string().email().safeParse(value).success
                ? "Please enter a valid email address"
                : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Admin Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="Enter your admin email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`pl-10 ${field.state.meta.errors.length > 0 ? 'border-red-500' : ''}`}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-red-600 text-sm">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "Password is required"
              : value.length < 6
                ? "Password must be at least 6 characters"
                : undefined,
          onBlur: ({ value }) =>
            !value
              ? "Password is required"
              : value.length < 6
                ? "Password must be at least 6 characters"
                : undefined,
          onSubmit: ({ value }) =>
            !value
              ? "Password is required"
              : value.length < 6
                ? "Password must be at least 6 characters"
                : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Admin Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="Enter your admin password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`pl-10 ${field.state.meta.errors.length > 0 ? 'border-red-500' : ''}`}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-red-600 text-sm">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating admin account...
              </>
            ) : (
              "Create Admin Account"
            )}
          </Button>
        )}
      />
    </form>
  );
}
