'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Camera, Trash2, LogOut, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Panel from '@/components/ui/Panel';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Eyebrow from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { TextField, PasswordField, Alert } from '@/components/ui/Field';
import { useRequireUser } from '@/lib/useRequireUser';
import { updateProfile, changePassword, logout, localPhone } from '@/lib/auth';
import { members } from '@/data/members';

// Crop to a centred square and shrink, so the stored photo stays small.
function resizeImage(file, size = 192) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => reject(new Error('bad image'));
    img.src = url;
  });
}

export default function ProfileView() {
  const user = useRequireUser();
  const router = useRouter();
  const fileRef = useRef(null);
  const [msg, setMsg] = useState({ photo: null, info: null, pass: null }); // { tone, text }
  const [busy, setBusy] = useState(false);
  const flash = (k, tone, text) => setMsg((m) => ({ ...m, [k]: { tone, text } }));

  if (!user) return <Loader />;
  const member = members.find((m) => m.phone === localPhone(user.phone));

  async function onPhoto(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return flash('photo', 'error', 'Please choose an image file.');
    if (file.size > 8 * 1024 * 1024) return flash('photo', 'error', 'Image is too large (max 8 MB).');
    try {
      const r = updateProfile({ avatar: await resizeImage(file) });
      flash('photo', r.error ? 'error' : 'success', r.error || 'Profile photo updated.');
    } catch {
      flash('photo', 'error', 'Could not read that image.');
    }
  }

  function onInfo(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = updateProfile({ name: f.get('name').toString(), email: f.get('email').toString() });
    flash('info', r.error ? 'error' : 'success', r.error || 'Profile saved.');
  }

  async function onPassword(e) {
    e.preventDefault();
    const form = e.currentTarget, f = new FormData(form);
    if (f.get('next') !== f.get('confirm')) return flash('pass', 'error', 'The two new passwords do not match.');
    setBusy(true);
    const r = await changePassword(f.get('current').toString(), f.get('next').toString());
    setBusy(false);
    if (r.error) return flash('pass', 'error', r.error);
    form.reset();
    flash('pass', 'success', 'Password changed.');
  }

  const note = (k) => msg[k] && <Alert tone={msg[k].tone} role="status" className="mb-4">{msg[k].text}</Alert>;
  const joined = user.joined ? new Date(user.joined).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  return (
    <Container className="py-8 sm:py-12">
      <Eyebrow>Your account</Eyebrow>
      <h1 className="mb-6 text-[29px] md:text-4xl">My profile</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <Panel className="h-fit text-center" bodyClassName="flex flex-col items-center">
          <Avatar size="lg" text={user.name.trim()[0].toUpperCase()} src={user.avatar} className="!size-28 !text-5xl" />
          <h2 className="mt-4 text-xl">{user.name}</h2>
          <p className="text-sm text-muted">{user.email || user.phone}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {member ? <Badge tone="success">Member #{member.sl}</Badge> : <Badge tone="warn">Not in member list</Badge>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => fileRef.current.click()}>
              <Camera size={15} /> {user.avatar ? 'Change photo' : 'Add photo'}
            </Button>
            {user.avatar && (
              <Button size="sm" variant="secondary" onClick={() => { const r = updateProfile({ avatar: '' }); flash('photo', r.error ? 'error' : 'success', r.error || 'Photo removed.'); }}>
                <Trash2 size={15} /> Remove
              </Button>
            )}
          </div>
          <div className="mt-4 w-full text-left">{note('photo')}</div>
          <p className="text-xs text-muted">Without a photo, your name’s first letter is shown.</p>
          <div className="mt-5 grid w-full gap-2 border-t border-line pt-5">
            {member && (
              <Link href={`/dashboard/members/${member.id}`} className="flex items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-medium text-brand hover:bg-mint">
                <Users size={16} /> View my member account
              </Link>
            )}
            <button type="button" onClick={() => { logout(); router.replace('/'); }} className="flex items-center justify-center gap-2 rounded-full border border-[#f1c7c7] py-2.5 text-sm font-medium text-[#a22] hover:bg-[#fdeeee]">
              <LogOut size={16} /> Log out
            </button>
          </div>
        </Panel>

        <div className="grid grid-cols-1 gap-6">
          <Panel title="Profile details" subtitle={`Joined ${joined}`}>
            <form onSubmit={onInfo} noValidate>
              {note('info')}
              <div className="grid sm:grid-cols-2 sm:gap-5">
                <TextField label="Full name" name="name" defaultValue={user.name} required maxLength={80} autoComplete="name" />
                <TextField label="Email" name="email" type="email" defaultValue={user.email} required maxLength={120} autoComplete="email" />
              </div>
              <TextField label="Mobile number (cannot be changed)" value={user.phone} readOnly disabled className="[&_input]:bg-sand" />
              <Button type="submit">Save changes</Button>
            </form>
          </Panel>

          <Panel title="Change password" subtitle="Use at least 8 characters with letters and numbers.">
            <form onSubmit={onPassword} noValidate>
              {note('pass')}
              <PasswordField label="Current password" name="current" required maxLength={128} autoComplete="current-password" />
              <div className="grid sm:grid-cols-2 sm:gap-5">
                <PasswordField label="New password" name="next" required maxLength={128} autoComplete="new-password" />
                <PasswordField label="Confirm new password" name="confirm" required maxLength={128} autoComplete="new-password" />
              </div>
              <Button type="submit" disabled={busy}>{busy ? 'Please wait…' : 'Update password'}</Button>
            </form>
          </Panel>
        </div>
      </div>
    </Container>
  );
}
