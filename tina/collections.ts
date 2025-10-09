import { Collection, TinaField } from "tinacms";

export const bodyField = {
  type: "string",
  name: "content",
  label: "Conteúdo",
  isBody: true,
  ui: {
    component: "textarea",
  },
} as const;

const defaultValues = {
  publishedAt: new Date().toISOString().split("T")[0],
  visibility: true,
};

const visibilityField: TinaField = {
  type: "boolean",
  name: "visibility",
  label: "Visibilidade",
};

const publishedAtField: TinaField = {
  type: "string",
  name: "publishedAt",
  label: "Data de Publicação",
  description: "Escolha a data de publicação",
  required: true,
};

export const settingsCollection: Collection = {
  label: "Settings",
  name: "settings",
  path: "content/settings",
  format: "json",
  fields: [
    {
      type: "string",
      label: "Cor primária",
      name: "primaryColor",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Cor primária - dark",
      name: "primaryColorDark",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      label: "Cor primária - light",
      name: "primaryColorLight",
      ui: {
        component: "color",
      },
    },
  ],
};

export const aboutHomeCollection: Collection = {
  label: "About Home",
  name: "aboutHome",
  path: "content/pt/about",
  match: { include: "aboutHome" },
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "stack",
      label: "Tecnologias",
      list: true,
      ui: {
        component: "text",
      },
    },
    {
      type: "boolean",
      name: "showContinueReadingButton",
      label: "Mostrar botão 'continuar lendo'",
    },
    bodyField,
  ],
};

export const technologiesCollection: Collection = {
  label: "Stacks",
  name: "technologies",
  path: "content/data",
  format: "json",
  match: { include: "tech" },
  fields: [
    {
      type: "object",
      name: "items",
      label: "Tech List",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name }) },
      fields: [
        { type: "string", name: "key", label: "Key", required: true },
        { type: "string", name: "name", label: "Name", required: true },
        { type: "string", name: "icon", label: "Icone", required: true },
        {
          type: "string",
          name: "color",
          label: "Cor",
          required: true,
          ui: {
            component: "color",
          },
        },
        {
          type: "object",
          name: "description",
          label: "Descrição",
          fields: [
            {
              type: "string",
              name: "pt",
              label: "Descrição (PT)",
              required: true,
            },
            {
              type: "string",
              name: "en",
              label: "Descrição (EN)",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const aboutCollection: Collection = {
  label: "About",
  name: "about",
  path: "content/pt/about",
  match: { include: "about" },
  format: "mdx",
  fields: [bodyField],
};

export const postCollection: Collection = {
  name: "post_pt",
  label: "Posts",
  path: "content/pt/posts",
  format: "mdx",
  fields: [
    visibilityField,
    {
      type: "string",
      name: "title",
      label: "Titulo",
      required: true,
    },
    publishedAtField,
    bodyField,
  ],
  defaultItem: defaultValues,
};

export const projectCollection: Collection = {
  name: "project_pt",
  label: "Projects",
  path: "content/pt/projects",
  format: "mdx",
  fields: [
    visibilityField,
    {
      type: "string",
      name: "name",
      label: "Nome",
      required: true,
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Descrição curta",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Descrição",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "icon",
      label: "Icone",
      required: true,
    },
    {
      type: "string",
      name: "stacks",
      label: "Tecnologias usadas",
      list: true,
      required: true,
    },

    {
      type: "string",
      name: "projectUrl",
      label: "URL do projeto",
    },
    {
      type: "string",
      name: "codeUrl",
      label: "URL Código",
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { label: "Em desenvolvimento", value: "development" },
        { label: "Concluido", value: "done" },
      ],
    },
    publishedAtField,
    bodyField,
  ],
  defaultItem: defaultValues,
};
