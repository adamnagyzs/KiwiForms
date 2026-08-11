create or replace function public.create_form_submission(
  p_form_id uuid,
  p_answers jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_submission_id uuid;
  v_answer jsonb;
begin
  if not exists (select 1 from forms where id = p_form_id) then
    raise exception 'Form not found';
  end if;

  if jsonb_array_length(p_answers) = 0 then
    raise exception 'At least one answer is required';
  end if;

  insert into form_submissions (form_id)
  values (p_form_id)
  returning id into v_submission_id;

  for v_answer in select * from jsonb_array_elements(p_answers)
  loop
    insert into answers (submission_id, question_id, value)
    values (
      v_submission_id,
      (v_answer->>'question_id')::uuid,
      v_answer->>'value'
    );
  end loop;

  return v_submission_id;
end;
$$;

grant execute on function public.create_form_submission(uuid, jsonb) to service_role;
