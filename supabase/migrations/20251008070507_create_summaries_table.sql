/*
  # Create summaries table for notes history

  1. New Tables
    - `summaries`
      - `id` (uuid, primary key) - Unique identifier for each summary
      - `user_id` (uuid, foreign key) - References auth.users
      - `title` (text) - Title/preview of the summary
      - `original_content` (text) - Original notes content
      - `summary_content` (text) - The AI-generated summary
      - `content_type` (text) - Type of content (pdf or text)
      - `original_length` (integer) - Character count of original content
      - `summary_length` (integer) - Character count of summary
      - `created_at` (timestamptz) - When the summary was created

  2. Security
    - Enable RLS on `summaries` table
    - Add policies for authenticated users to:
      - Read their own summaries
      - Insert their own summaries
      - Update their own summaries
      - Delete their own summaries
*/

CREATE TABLE IF NOT EXISTS summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  original_content text NOT NULL,
  summary_content text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  original_length integer DEFAULT 0,
  summary_length integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own summaries"
  ON summaries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own summaries"
  ON summaries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own summaries"
  ON summaries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own summaries"
  ON summaries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS summaries_user_id_idx ON summaries(user_id);
CREATE INDEX IF NOT EXISTS summaries_created_at_idx ON summaries(created_at DESC);