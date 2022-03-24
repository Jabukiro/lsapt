<?php
function fillTemplate($templateAbsoluteFilePath, $data)
{
    $template = file_get_contents($templateAbsoluteFilePath);
    foreach ($data as $key => $value) {
        $template = str_replace('{{' . $key . '}}', $value, $template);
    }
    return ($template);
}
