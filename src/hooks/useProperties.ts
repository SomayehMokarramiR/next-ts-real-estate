"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/services/property";

import { IProperty } from "@/app/models/Property";

// =========================
// GET ALL PROPERTIES
// =========================

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],

    queryFn: getProperties,
  });
}

// =========================
// GET SINGLE PROPERTY
// =========================

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property", id],

    queryFn: () => getPropertyById(id),

    enabled: !!id,
  });
}

// =========================
// CREATE PROPERTY
// =========================

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IProperty>) => createProperty(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });
}

// =========================
// UPDATE PROPERTY
// =========================

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IProperty> }) =>
      updateProperty(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.id],
      });
    },
  });
}

// =========================
// DELETE PROPERTY
// =========================

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });
}
