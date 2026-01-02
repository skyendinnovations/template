"use client";

import { useForm } from "@tanstack/react-form";
import z from "zod";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@template/ui";
import { createDemoAction, getUsersAction } from "@/data/demo";
import { toast } from "sonner";
import { Loader2, User, Mail, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export function DemoForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsersAction();
      if (result?.data?.success && result.data?.data) {
        setUsers(result.data.data);
      } else {
        toast.error("Failed to load users");
      }
      setLoadingUsers(false);
    };

    fetchUsers();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      user: "",
    },
    onSubmit: async ({ value }) => {
      const result = await createDemoAction(value);

      if (result?.data?.success) {
        toast.success("Demo record created successfully!");
        form.reset();
      } else {
        const errorMessage =
          result?.data?.error ||
          (typeof result?.serverError === "object"
            ? result.serverError.message
            : result?.serverError) ||
          "Failed to create demo record";
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
      className="space-y-6"
    >
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
            <Label htmlFor={field.name}>Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Enter full name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`pl-10 ${field.state.meta.errors.length > 0 ? "border-red-500" : ""}`}
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
            <Label htmlFor={field.name}>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="Enter email address"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`pl-10 ${field.state.meta.errors.length > 0 ? "border-red-500" : ""}`}
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
        name="age"
        validators={{
          onChange: ({ value }) =>
            !value || value < 1
              ? "Age must be at least 1"
              : value > 150
                ? "Age must be less than 150"
                : undefined,
          onBlur: ({ value }) =>
            !value || value < 1
              ? "Age must be at least 1"
              : value > 150
                ? "Age must be less than 150"
                : undefined,
          onSubmit: ({ value }) =>
            !value || value < 1
              ? "Age must be at least 1"
              : value > 150
                ? "Age must be less than 150"
                : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Age</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={field.name}
                name={field.name}
                type="number"
                placeholder="Enter age"
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
                className={`pl-10 ${field.state.meta.errors.length > 0 ? "border-red-500" : ""}`}
                min="1"
                max="150"
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
        name="user"
        validators={{
          onChange: ({ value }) =>
            !value ? "Please select a user" : undefined,
          onBlur: ({ value }) => (!value ? "Please select a user" : undefined),
          onSubmit: ({ value }) =>
            !value ? "Please select a user" : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Associated User</Label>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
              disabled={loadingUsers}
            >
              <SelectTrigger
                className={`${field.state.meta.errors.length > 0 ? "border-red-500" : ""}`}
              >
                <SelectValue
                  placeholder={
                    loadingUsers ? "Loading users..." : "Select a user"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="w-full"
            disabled={!canSubmit || isSubmitting || loadingUsers}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating demo record...
              </>
            ) : (
              "Create Demo Record"
            )}
          </Button>
        )}
      />
    </form>
  );
}
