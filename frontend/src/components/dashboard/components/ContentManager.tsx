import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import CategoryManager from './CategoryManager';
import TagManager from './TagManager';
import Form from '@/components/common/Form';

const ContentManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [contentType, setContentType] = useState('');
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'Contenido 1',
      description: 'Descripción del contenido 1',
      category: 'Categoría 1',
      tags: 'tag1, tag2',
      type: 'texto',
    },
    {
      id: 2,
      title: 'Contenido 2',
      description: 'Descripción del contenido 2',
      category: 'Categoría 2',
      tags: 'tag3, tag4',
      type: 'imagen',
    },
    {
      id: 3,
      title: 'Contenido 3',
      description: 'Descripción del contenido 3',
      category: 'Categoría 3',
      tags: 'tag5, tag6',
      type: 'video',
    },
  ]);
  const [editContent, setEditContent] = useState(null);

  const handleSave = () => {
    if (typeof document !== 'undefined') {
      const title = (document.getElementById('title') as HTMLInputElement).value;
      const description = (document.getElementById('description') as HTMLTextAreaElement).value;
      const category = (document.querySelector('#category > div > button > span') as HTMLSpanElement).innerText;
      const tags = (document.getElementById('tags') as HTMLInputElement).value;
      const type = (document.querySelector('#type > div > button > span') as HTMLSpanElement).innerText;
      const content = (document.getElementById('content') as HTMLInputElement)?.value || '';

      const newContent = {
        title,
        description,
        category,
        tags,
        type,
        content,
      };

      alert(JSON.stringify(newContent, null, 2));
    }

    setShowForm(false);
    setEditContent(null);
  };

  return (
    <div>
      <h2>Gestión de Contenidos</h2>
      <Button onClick={() => setShowForm(!showForm)}>Crear Nuevo Contenido</Button>
      {(showForm || editContent) && (
        <Form
          title={editContent ? 'Editar Contenido' : 'Crear Nuevo Contenido'}
          description="Ingrese la información del nuevo contenido."
          onSubmit={() => {
            const title = document.getElementById('title') as HTMLInputElement;
            const description = document.getElementById('description') as HTMLTextAreaElement;
            const category = document.getElementById('category') as HTMLSelectElement;
            const tags = document.getElementById('tags') as HTMLInputElement;
            const type = document.getElementById('type') as HTMLSelectElement;

            if (editContent) {
              setContents(
                contents.map((c) =>
                  c.id === editContent.id
                    ? {
                        ...c,
                        title: title.value,
                        description: description.value,
                        category: category.value,
                        tags: tags.value,
                        type: type.value,
                      }
                    : c,
                ),
              );
            }
            handleSave();
          }}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" defaultValue={editContent?.title || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" defaultValue={editContent?.description || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría</Label>
            {/* <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="categoria1">Categoría 1</SelectItem>
                <SelectItem value="categoria2">Categoría 2</SelectItem>
                <SelectItem value="categoria3">Categoría 3</SelectItem>
              </SelectContent>
            </Select> */}
            <CategoryManager />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Etiquetas</Label>
            {/* <Input id="tags" defaultValue={editContent?.tags || ''} /> */}
            <TagManager />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Contenido</Label>
            <Select onValueChange={setContentType} defaultValue={editContent?.type || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un tipo de contenido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="texto">Texto</SelectItem>
                <SelectItem value="imagen">Imagen</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {contentType === 'texto' ? (
            <div className="grid gap-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea id="content" />
            </div>
          ) : (contentType === 'imagen' || contentType === 'video' || contentType === 'audio') ? (
            <div className="grid gap-2">
              <Label htmlFor="content">Archivo</Label>
              <Input id="content" type="file" />
            </div>
          ) : null}
        </Form>
      )}
      <div>
        <h3>Contenidos Existentes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Etiquetas</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.description}</TableCell>
                <TableCell>{content.category}</TableCell>
                <TableCell>{content.tags}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>
                  <Button onClick={() => setContents(contents.filter((c) => c.id !== content.id))}>
                    Eliminar
                  </Button>
                  <Button onClick={() => setEditContent(content)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Aquí se implementará la lógica para la gestión de contenidos */}
    </div>
  );
};

export default ContentManager;
